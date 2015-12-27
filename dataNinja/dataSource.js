
export default class DataSource {
    constructor($cachedResource, definitions){
        this.definitions = definitions;
        this.$cachedResource = $cachedResource;
        
        this.stack = {};
    }
    
    registerResource(definition) {
        
        if(typeof(this.stack[definition.key]) === 'undefined') {
            
            this.stack[definition.key] = new this.$cachedResource(definition);
        }
    }
    
    load(id) { //Load cache if found
            return (typeof (this.stack[id]) != 'undefined') ? this.stack[id] : false;
    }
    // this is from the old version and has been replaced 
    // with registerResource
    // save (modelCache, id) { //Cache data with unique id
    //         this.stack[id] = modelCache;
    // }
    remove(id) {//Remove cache for identifier
            if (typeof (this.stack[id]) != 'undefined')
                delete this.stack[id];
    }
    
    clearCache() {
            //console.log(this.stack);
            for (var key in this.stack) {
                if (this.stack.hasOwnProperty(key)) {
                    this.stack[key].clear();
                }
            }
            
    }
    
    init() {
            for (var i = 0; i < this.definitions.length; i++)
            {
                
                this.registerResource(this.definitions[i]);
            }
        }
}