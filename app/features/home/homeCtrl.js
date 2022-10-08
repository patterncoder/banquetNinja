

class tmHomeCtrl {
    constructor (tmIdentity, $dataSource, $rootScope) {
        this.tmIdentity = tmIdentity;
        this.$dataSource = $dataSource;
        $rootScope.$on('loggedIn', (event, data) => {
          this.loadData();
      });
        this.loadData();
    }

    loadData () {
        if(!this.tmIdentity.isAuthenticated()) return;
        let today = new Date();
        let bids = this.$dataSource.load('Contract');
        bids.query({
            select: 'eventName eventDate time customer venues',
            'where[status]': 'pending',
            'moreThan[eventDate]' : new Date(),
            "populate[customer]": "firstName lastName",
            "sort[eventDate]": 1,
            "page[size]": 5
          }, true, true).then((data) => {
            this.upcomingBids = (Array.isArray(data) && data || []).map((event) => {
              if(event.eventDate) {
                let date = new Date(event.eventDate);
                event.eventDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`
              } else {
                event.eventDate = 'No Date';
              }
              return event;
            });
          })

          bids.query({
            select: 'eventName eventDate customer',
            'where[status]': 'booked',
            'moreThan[eventDate]' : `${today.getMonth() +1}-${today.getDate()}-${today.getFullYear()}`,
            "populate[customer]": "firstName lastName",
            "sort[eventDate]": 1,
            "page[size]": 5
          }, true, true).then((data) => {
            this.upcomingEvents = (Array.isArray(data) && data || []).map((event) => {
              if(event.eventDate) {
                let date = new Date(event.eventDate);
                event.eventDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`
              } else {
                event.eventDate = 'No Date';
              }
              return event;
            });
          });

          let menuGroups = this.$dataSource.load('MenuGroup');
          menuGroups.query({
            select: 'name active',
            "where[active]": true
          }, true, true).then((data) => {
            this.activeMenuGroups = data;
          })
    }
}

tmHomeCtrl.$inject = ['tmIdentity', '$dataSource', '$rootScope'];

export default tmHomeCtrl