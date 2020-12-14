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
};

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
            .then(weatherData => {
                document.getElementById('weatherCodeBlock').textContent = JSON.stringify(weatherData);
            });
    }
};

var blazorCarousel = {
    instances: {},
    init: function (carouselId, dotNetReference, carouselNode) {
        var carousel = {
            dotNetReference: dotNetReference,
            $carouselNode: $(carouselNode)
        };
        carousel.$carouselNode.carousel();
        carousel.$carouselNode.on('slide.bs.carousel', function (event) {
            dotNetReference.invokeMethod("OnSlide", event.direction, event.from, event.to);
        });
        carousel.$carouselNode.on('slid.bs.carousel', function (event) {
            dotNetReference.invokeMethod("OnSlid", event.direction, event.from, event.to);
        });
        this.instances[carouselId] = carousel;
    },
    dispose: function (carouselId) {
        this.instances[carouselId].$carouselNode.carousel('dispose');
        delete this.instances[carouselId];
    }
};

// for .NET 5 with IJSObjectReference
var createBlazorCarousel = function(){
    return {
        dotNetReference: null,
        $carouselNode: null,
        init: function (dotNetReference, carouselNode) {
            this.dotNetReference = dotNetReference;
            this.$carouselNode = $(carouselNode);

            this.$carouselNode.carousel();
            this.$carouselNode.on('slide.bs.carousel', function (event) {
                dotNetReference.invokeMethod("OnSlide", event.direction, event.from, event.to);
            });
            this.$carouselNode.on('slid.bs.carousel', function (event) {
                dotNetReference.invokeMethod("OnSlid", event.direction, event.from, event.to);
            });
        },
        dispose: function () {
            this.$carouselNode.carousel('dispose');
        }
    }
}