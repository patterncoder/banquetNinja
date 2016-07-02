
export default [function(){
    return function(scope, element, attr) {
        var pureJsElement = element[0];
        pureJsElement.draggable = true;
        pureJsElement.addEventListener('dragstart', function(event) {
            console.log(event);
            console.log(scope);
            event.dataTransfer.effectAllowed = "move";
            event.dataTransfer.setData('text/plain', this.id);
            this.classList.add('drag');
            return false;
        //do something here.
        }, false);
    };
}];