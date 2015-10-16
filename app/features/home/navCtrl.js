function navCtrl(navigation){
    var self = this;
    // var nav = {};
    var graph = navigation.navigation;
    function init(){
    console.log(JSON.stringify(graph));
    //     for (var k in graph){
    //     console.log(graph[k]);
    //         if (!graph[k].parent) {
    //             nav[graph[k].name] = graph[k];// top level
                
    //             }
    //         }
    //     console.log(nav);
    //     self.test = nav
    }
    init();
    
    
}

navCtrl.$inject = ['navigation'];

export default navCtrl
