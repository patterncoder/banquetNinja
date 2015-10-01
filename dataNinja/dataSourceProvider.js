




import DataSource from './dataSource';


export default function (){
    var resourceDefinitions = [];
    this.addApiRoute = function(definition) {
        resourceDefinitions.push(definition);
        
    };
    
    this.$get = ['$cachedResource', function ($cachedResource){
           return new DataSource($cachedResource, resourceDefinitions); 
        }];
}