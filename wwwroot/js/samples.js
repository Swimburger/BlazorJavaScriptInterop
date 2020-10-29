// .NET to JS samples
window.dotNetToJsSamples = {
    setText: function(node, text)
    {
        node.textContent = text;
    },
    printDotNetObject: function(node, objectFromDotNet)
    {
        node.textContent = JSON.stringify(objectFromDotNet);
    },
    getValue: function(node)
    {
        return node.value;
    },
    getWeatherData: function(){
        return fetch('/sample-data/weather.json')
            .then(response => response.json());
    }
}

// JS to .NET samples
window.jsToDotNetSamples = {
    dotNetReference: null,
    setDotNetReference: function(dotNetReference)
    {
        this.dotNetReference = dotNetReference;
    },
    printPersonFromDotNet: function(){
        var person = this.dotNetReference.invokeMethod("GetPerson");
        document.getElementById('personCodeBlock').textContent = JSON.stringify(person);
    },
    getWeatherDataFromDotNet: function(node){
        this.dotNetReference.invokeMethodAsync('GetWeatherAsync')
            .then(data => {
                document.querySelector('code').textContent = JSON.stringify(data);
            });
    }
}

var blazorCarousel = {
    instances: {},
    init: function (carouselId, dotNetReference, carouselNode) {
        var carousel = {
            dotNetReference: dotNetReference,
            $carouselNode: $(carouselNode)
        };
        carousel.$carouselNode.carousel();
        this.instances[carouselId] = carousel;
    },
    dispose: function (carouselId) {
        this.instances[carouselId].$carouselNode.carousel('dispose');
        delete this.instances[carouselId];
    }
}