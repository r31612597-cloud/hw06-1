# Bar Chart Race

A Pen created on CodePen.

Original URL: [https://codepen.io/Lexon-___/pen/vEGpoBb](https://codepen.io/Lexon-___/pen/vEGpoBb).

<!-- wp:paragraph -->
<p>Bar Chart Race is a great and highly visual way to display data changing over time in the form of an animated bar chart. It's a very comprehensible representation of time-based changes in data.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 id="key-implementation-details">Key implementation details</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>In this demo we have year-based data, and we interpolate the values in a linear fashion inside the year to show smooth continuous growth. We [re]sort series on the category (Y) axis from high to low and then we calculate the necessary zoom level to zoom-in to a point where only the non-zero items are visible.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Finally, on each step we calculate the series position delta and set an animation on the data-item, so when its position changes it doesn't jump into its new place immediately but goes there in a smooth animation.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 id="related-tutorials">Related tutorials</h2>
<!-- /wp:heading -->

<!-- wp:list -->
<ul><li><a href="https://www.amcharts.com/docs/v5/concepts/animations/">Animations</a></li><li><a href="https://www.amcharts.com/docs/v5/charts/xy-chart/axes/category-axis/">Category axis</a></li></ul>
<!-- /wp:list -->