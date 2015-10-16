

export default function Navigation(graph){
    
    function treeify(list, idAttr, parentAttr, childrenAttr) {
    if (!idAttr) idAttr = 'name';
    if (!parentAttr) parentAttr = 'parent';
    if (!childrenAttr) childrenAttr = 'links';

    var treeList = [];
    var lookup = {};
    list.forEach(function(obj) {
        lookup[obj[idAttr]] = obj;
        obj[childrenAttr] = [];
    });
    list.forEach(function(obj) {
        if (obj[parentAttr] != null) {
            lookup[obj[parentAttr]][childrenAttr].push(obj);
        } else {
            treeList.push(obj);
        }
    });
    return treeList;
    
};
    
    
    
    
    this.navigation = treeify(graph);
}