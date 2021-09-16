import config from 'config';
export default [
    '$dataSourceProvider', function($dataSourceProvider) {
        
        $dataSourceProvider.addApiRoute({
            key: 'Contract', 
            url: config.apiBase + '/events/contracts/:_id', 
            defaults: { _id: "@id" },
            methods: {update: { method: 'PUT', isArray: false },
                        query: { method: 'GET', isArray: false}}
        });
        $dataSourceProvider.addApiRoute({
            key: 'BookedContract', 
            url: config.apiBase + '/events/contracts/:_id', 
            defaults: { _id: "@id" },
            methods: {update: { method: 'PUT', isArray: false },
                        query: { method: 'GET', isArray: false}}
        });
        $dataSourceProvider.addApiRoute({
            key: 'Venue', 
            url: config.apiBase + '/events/venues/:_id', 
            defaults: { _id: "@id" },
            methods: {update: { method: 'PUT', isArray: false },
                        query: { method: 'GET', isArray: false}}
        });
        $dataSourceProvider.addApiRoute({
            key: 'RentalItem', 
            url: config.apiBase + '/events/rentalitems/:_id', 
            defaults: { _id: "@id" },
            methods: {update: { method: 'PUT', isArray: false },
                        query: { method: 'GET', isArray: false}}
        });
        $dataSourceProvider.addApiRoute({
            key: 'StaffMember', 
            url: config.apiBase + '/events/staffmembers/:_id', 
            defaults: { _id: "@id" },
            methods: {update: { method: 'PUT', isArray: false },
                        query: { method: 'GET', isArray: false}}
        });
    }
]
