describe('area series', function() {

  beforeEach(inject(function(n3utils) {
    spyOn(n3utils, 'getDefaultMargins').andReturn(
      {top: 20, right: 50, bottom: 30, left: 50}
    );
  }));

  beforeEach(function() {
    scope.$apply(function() {
      scope.data = [
        {x: 0, value: 4}, {x: 1, value: 8}, {x: 2, value: 15},
        {x: 3, value: 16}, {x: 4, value: 23}, {x: 5, value: 42}
      ];

      scope.options = {
        series: [{y: 'value', color: '#4682b4', type: 'area'} ]
      };
    });
  });

  it('should properly configure y axis', function() {
    var yAxis = elm.find('svg').children()[0].childNodes[1];

    var ticks = yAxis.childNodes;

    expect(ticks.length).toBe(12);

    expect(ticks[0].textContent).toBe('0');
    expect(ticks[10].textContent).toBe('50');
  });

  it('should properly configure x axis', function() {
    var xAxis = elm.find('svg').children()[0].childNodes[0];

    var ticks = xAxis.childNodes;

    expect(ticks.length).toBe(12);

    expect(ticks[0].textContent).toBe('0.0');
    expect(ticks[10].textContent).toBe('5.0');
  });

  it('should create 3 elements', function() {
    var svgGroup = elm.find('svg').children()[0];
    var content = svgGroup.childNodes[2];
    expect(content.childNodes.length).toBe(3);
  });

  it('should create an area group', function() {
    var svgGroup = elm.find('svg').children()[0];
    var content = svgGroup.childNodes[2];
    var areaGroup = content.childNodes[0];
    expect(areaGroup.getAttribute('class')).toBe('areaGroup series_0');
    expect(areaGroup.getAttribute('style').trim()).toBeSameStyleAs('fill: #4682b4;');

    var areaPath = areaGroup.childNodes[0];
    expect(areaPath.getAttribute('class')).toBe('area');
    expect(areaPath.getAttribute('d'))
      .toBe('M0,414L162,378L324,315L486,306L648,243L810,72L810,450L648,450L486,450L324,450L162,450L0,450Z');
  });

  it('should create a line group', function() {
    var svgGroup = elm.find('svg').children()[0];
    var content = svgGroup.childNodes[2];

    var lineGroup = content.childNodes[1];
    expect(lineGroup.getAttribute('class')).toBe('lineGroup series_0');
    expect(lineGroup.getAttribute('style').trim()).toBeSameStyleAs('stroke: #4682b4;');
  });

  it('should create a dots group', function() {
    var svgGroup = elm.find('svg').children()[0];
    var content = svgGroup.childNodes[2];

    var dotsGroup = content.childNodes[2];
    expect(dotsGroup.nodeName).toBe('g');

    var dots = dotsGroup.childNodes;
    expect(dots.length).toBe(6);

    var expectedCoordinates = [
      {x: '0', y: '414'},
      {x: '162', y: '378'},
      {x: '324', y: '315'},
      {x: '486', y: '306'},
      {x: '648', y: '243'},
      {x: '810', y: '72'}
    ];

    for (var i = 0; i < dots.length; i++) {
      expect(dots[i].nodeName).toBe('circle');
      expect(dots[i].getAttribute('cx')).toBe(expectedCoordinates[i].x);
      expect(dots[i].getAttribute('cy')).toBe(expectedCoordinates[i].y);
    }
  });
});
