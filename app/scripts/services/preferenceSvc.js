/**
 * Created by io on 3/3/15.
 */

/**
 * Created by ioannissuarez on 6/20/14.
 */


(function(angular) {

  'use strict';

  angular.module(window.appName).factory('preferenceSvc', preferenceSvc);

  function preferenceSvc(fbutil, $firebaseArray,$firebaseObject, $q, abmConfig) {

    var preferences_companies_url = 'preferences_companies';
    var preferences_users_url = 'preferences_candidates';
    var filter_list = 'filters';


    return {
      addCompanyToPreferences: addCompanyToPreferences,
      addUserToPreferences: addUserToPreferences,
     matchByPreference: matchByPreference,
      match: match,
      getFilters: getFilters
    };



    function getFilters(cb){

    var filters = fbutil.ref('filters').once('value', function(filters) {
      cb(filters.val());
   })}

    /**
     *
     * @param uid
     * @param preferenceList
     *
     * Add user to the user list of each preference
     * At the preferences_users location:
     * preferences_companies : {
     *   preference_1: {company_1: true}
     *   preference_2: {company_2: true}
     * }
     *
     */

    function addCompanyToPreferences(uid, preferenceList) {
      addItemToPreferences(uid, preferenceList, preferences_companies_url);
    }
    function addUserToPreferences(uid, preferenceList) {
      addItemToPreferences(uid, preferenceList, preferences_users_url);
    }


    /**
     *
     * @param type (users, companies)
     * @param preferencList array or object with preference to match  {preference_1: true, preference_2: true}
     * @returns {*}
     */
    function matchByPreference(type, preferenceList) {

      var deferred = $q.defer();

      var preferenceTypeRef = fbutil.ref('preferences_' + type);
      var matches = {};
      var preferenceListCount =  getPreferenceListCount(preferenceList);
      var itemsThatMatchPreferenceKey;

      var preferenceListProcessed = 0;

      //for every preference in this list, add the user id with value true
      angular.forEach(preferenceList, function(value, preferenceKey) {

        //value: true or false
        if (value) {
            itemsThatMatchPreferenceKey = $firebaseArray(preferenceTypeRef.child(preferenceKey));
            addMatchesToList(itemsThatMatchPreferenceKey,
            preferenceKey, matches).then(function(currentMatchList) {
              preferenceListProcessed += 1;
              if (preferenceListProcessed == preferenceListCount) {
                //currentMatchList is equal to matches...
                deferred.resolve(currentMatchList);
              }

            });
        }
      });

      return deferred.promise;

    }




    function addMatchesToList(currentMatches, preferenceKey, existingMatches) {
      var item, deferred;
      deferred = $q.defer();

      currentMatches.$loaded().then(function (match) {

        //for every preference in this list, add the user id with value true
        for (var i = 0; i < match.length; i++) {
          item = match[i];

          //create a new match entry on existing matches if it does not exist
          existingMatches[item.$id] = existingMatches[item.$id] || {};

          //add the current preferenceKey as an entry for that match
          existingMatches[item.$id][preferenceKey] = true;
        }

        deferred.resolve(existingMatches);

      });

      return deferred.promise;

    }

    function getPreferenceListCount(preferenceList) {
      return angular.isArray(preferenceList)
        ? preferenceList.length
        :   Object.keys(preferenceList).length;
    }

   //match companies to users or users to company
   //profile will be company if we are trying to match users and viceversa
   //matchee will be company if we are trying to mach user and viceversa.
   //Profile != matchee
   //preference_list is the list of uid.
   //uid is the id of candidate if we are trying to match companies and
   //viceversa
    function match (uid,  uid_type, disciplines, business_skills, minimum_donation ){
     var matcheeRefUrl = (uid_type == 'companies') ? 'companies' : 'candidates';
     var matcheeRef = fbutil.ref(matcheeRefUrl);
     var profileRefUrl = (uid_type == 'companies')? 'candidates' : 'companies';
     var matchesForMatcheesRef = fbutil.ref('matches_for_' + matcheeRefUrl);
     var matchesForProfileRef = fbutil.ref('matches_for_' + profileRefUrl);
     var matchee;

      //navigate all matchees
      matcheeRef.on('child_added', function (matcheeObj) {


        matchee = matcheeObj.val();

        //compares disciplines
        var match_disciplines = _.intersection(_.keys(disciplines), _.keys(matchee.disciplines));

        //compares business_skills
        var match_business_skills = _.intersection(_.keys(business_skills), _.keys(matchee.business_skills));

        //try to match on minimum_donataion
        var match_prefs_obj = {};
        if (minimum_donation && matchee.minimum_donation)   {

            //when matching candidates
            if (uid_type == 'candidates' && minimum_donation.min <= matchee.minimum_donation.min)
                match_prefs_obj[minimum_donation.key] = true;
            else if (uid_type == 'companies' && minimum_donation.min >= matchee.minimum_donation.min)
                match_prefs_obj[minimum_donation.key] = true;
        }

        if (_.isEmpty(match_prefs_obj) ||  match_disciplines.length === 0 || match_business_skills.length === 0 )
           match_prefs_obj = null;
        else {
            _.each(match_disciplines, function (pref) {
                match_prefs_obj[pref] = true
            });
            _.each(match_business_skills, function (pref) {
                match_prefs_obj[pref] = true
            });

        }
        //save this matches in both profile and matchee
        matchesForMatcheesRef.child(matcheeObj.key()).child(uid).set(match_prefs_obj);
        matchesForProfileRef.child(uid).child(matcheeObj.key()).set(match_prefs_obj);

     })
    }

    function addItemToPreferences(uid, preferenceList, url) {

      var valueForPreference;
      var filters;
      var preferenceRef;
      var preferenceTypeRef = fbutil.ref(url); //preferences_candidates / companies
      //need to grap or filtes and loop thru them. set to null what is not in
      //preference list
      fbutil.ref(filter_list).once('value', function (filtersObj) {

        filters = filtersObj.val();
        _.each(_.keys(filters), function (filter) {

           //proccess all filters for this filter. add companies to filter
           //preference if filter is on preferenceList
          _.each(_.keys(filters[filter]), function(preference) {
              valueForPreference = preferenceList[preference] == true ? true : null;
              var companyPref = {};
              companyPref[uid] = valueForPreference;
              preferenceTypeRef.child(preference).update(companyPref);
          } )

        });
      } )

    }

  }


})(angular);
