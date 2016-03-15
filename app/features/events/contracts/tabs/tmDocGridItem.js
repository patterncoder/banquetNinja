

function tmDocGridItemCtrl () {
    var $ctrl = this;
    
    
    
}

var tmDocGridItem = {
    template: require('!raw!jade-html!./tmDocGridItem.jade'),
    controller: tmDocGridItemCtrl,
    bindings: {
        item: '<',
        onDelete: '&',
        onEditItem: '&'
    }
}

export default tmDocGridItem;