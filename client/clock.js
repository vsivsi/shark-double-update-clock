
var radialUpdates = 0;
var tick = 0;

Meteor.setInterval(function () {
  Session.set('time', new Date);
  tick++;
}, 1000);

UI.body.helpers({

  hours: _.range(0, 12),

  degrees: function () {
    return 30 * this;
  },

  handData: function () {
    var time = Session.get('time') || new Date;
    return { hourDegrees: (time.getHours()+time.getMinutes()/60) * 30,
             minuteDegrees: (time.getMinutes()+time.getSeconds()/60) * 6,
             secondDegrees: time.getSeconds() * 6,
             updates: radialUpdates/(tick-1)/3 };
  },

  radial: function (angleDegrees,
                    startFraction,
                    endFraction) {
    var r = 100;
    var radians = (angleDegrees-90) / 180 * Math.PI;

    if (tick) { /* Exclude calls to plot the clock face */
      radialUpdates++;
    }

    return {
      x1: r * startFraction * Math.cos(radians),
      y1: r * startFraction * Math.sin(radians),
      x2: r * endFraction * Math.cos(radians),
      y2: r * endFraction * Math.sin(radians)
    };
  }
});
