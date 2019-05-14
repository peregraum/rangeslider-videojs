require('./rangeslider.js');

export default function RangeSliderComponent(options) {
    var player = this;

    player.rangeslider = new RangeSlider(player, options);

    //When the DOM and the video media is loaded
    function initialVideoFinished(event) {
        var plugin = player.rangeslider;
        //All components will be initialize after they have been loaded by videojs
        for (var index in plugin.components) {
            plugin.components[index].init_();
        }

        if (plugin.options.hidden)
            plugin.hide(); //Hide the Range Slider

        if (plugin.options.locked)
            plugin.lock(); //Lock the Range Slider

        if (plugin.options.panel === false)
            plugin.hidePanel(); //Hide the second Panel

        if (plugin.options.controlTime === false)
            plugin.hidecontrolTime(); //Hide the control time panel

        plugin._reset();
        player.trigger('loadedRangeSlider'); //Let know if the Range Slider DOM is ready
    }
    if (player.techName == 'Youtube') {
        //Detect youtube problems
        player.one('error', function (e) {
            alert(getYoutubeError(player.error));
        });
        player.on('firstplay', initialVideoFinished);
    } else {
        player.one('playing', initialVideoFinished);
    }

}