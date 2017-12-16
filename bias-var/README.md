## Polynomial regression bias-variance tradeoff playground
This is an interactive explaiable and playground for bias-variance tradeoff in polynomial regression. This is the final project of the [CSPC 547 -- Infoviz](http://www.cs.ubc.ca/~tmm/courses/547-15/) course taught by [Tamara Munzner](https://www.cs.ubc.ca/~tmm/) at the [University of British Columbia](https://www.cs.ubc.ca/).

- See the live demo of the project here [[link]](https://gursimar.github.io/d3-visualizations/bias-var/), and video explaining it here [[link]](https://www.youtube.com/watch?v=CUX5UTdYsQs)
- Also see the live demo of my project-colleague here [[link]](https://halldorbjarni.github.io/knn-viz/), and video here [[link]](https://www.youtube.com/watch?v=C0njr3l3Zs8&feature=youtu.be&hd=1) 

## Setting up
Just clone the repo, and run the following commands to make sure you have all dependencies.

```bash
bower install
open index.html
```

# Code
```
index.html - sets up the ui elements and js
js/ - contains the main javascript code for the project
js/bar_plot.js - conatins the code for bar plot
js/bias-var.js - contains code for bias variance calculation (I tried a couple of implementations)
js/box_plot.js - conatins the code for box plot
js/line_plot.js - conatins code for scatter and line plot
js/ml-functions.js - conatins code to generate data, fit models and predict
js/event_handling.js - conatins code to control slides and other controls
js/box.js - box plot library (taken form d3 site)
I wrote all the code expect box.js

css/ - contains the custom stylesheet for the project
css/styles.css - constains the stylesheet for the website
bower_componets/ - conatins libraries which I used in the project
images/ - conatins images used for datasets buttons

```

## Licence
MIT
