<template>
    <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="a" x2="0%" y2="100%">
                <stop id="stop_one" offset="0" />
                <stop id="stop_two" offset="1" />
            </linearGradient>
        </defs>
        <path id="svg_path" fill="url(#a)" />
    </svg>
</template>

<style scoped>
#svg_path {
    --start: 'M428,332.5Q415,415,332.5,439.5Q250,464,180.5,426.5Q111,389,103.5,319.5Q96,250,93,170Q90,90,170,76.5Q250,63,318,88.5Q386,114,413.5,182Q441,250,428,332.5Z';
    --startToMiddle: 'M427,333Q416,416,333,436Q250,456,205,398Q160,340,140.5,295Q121,250,129.5,194Q138,138,194,111.5Q250,85,313,104.5Q376,124,407,187Q438,250,427,333Z';
    --middle: 'M406,323Q396,396,323,415Q250,434,183,409Q116,384,63,317Q10,250,43.5,163.5Q77,77,163.5,71.5Q250,66,331,77Q412,88,414,169Q416,250,406,323Z';
    --middleToEnd: 'M418,308Q366,366,308,396.5Q250,427,204,384.5Q158,342,131.5,296Q105,250,91.5,164Q78,78,164,84.5Q250,91,322,98.5Q394,106,432,178Q470,250,418,308Z';
    --end: var(--start);

    animation: 10s linear 0s infinite normal both running move_blobs;
}

@media (prefers-reduced-motion) {
    #svg_path {
        animation: none;
    }
}

#stop_one {
    stop-color: var(--secondary);
}

#stop_two {
    stop-color: var(--primary);
}

/* 
  It's unfortunate but I dont think I can pass in the paths as props 
  [I tried this](https://stackoverflow.com/questions/42872002) but it 
  doesn't seem to work.
*/
@keyframes move_blobs {
    0% {
        d: path(var(--start));
    }

    25% {
        d: path(var(--startToMiddle));
    }

    50% {
        d: path(var(--middle));
    }

    75% {
        d: path(var(--middleToEnd));
    }

    100% {
        d: path(var(--start));
    }
}
</style>
