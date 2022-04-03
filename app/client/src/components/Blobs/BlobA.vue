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
  --start: "M411.5,308Q388,366,339,421.5Q290,477,216.5,456Q143,435,93.5,380Q44,325,74,261Q104,197,123.5,130.5Q143,64,210,80Q277,96,322,124Q367,152,401,201Q435,250,411.5,308Z";
  --startToMiddle: "M440.18125,321.58586Q421.20987,393.17171,351.5795,411.93958Q281.94912,430.70745,203.41732,448.4523Q124.88552,466.19715,79.91414,397.10812Q34.94276,328.01908,45.31875,253.4523Q55.69473,178.88552,101.36009,125.4682Q147.02544,72.05088,212.5159,81.00636Q278.00636,89.96184,335.58586,109.91096Q393.16535,129.86009,426.15899,189.93004Q459.15263,250,440.18125,321.58586Z";
  --middle: "M423.5,312.5Q399,375,338,387.5Q277,400,209,420Q141,440,116.5,373.5Q92,307,65.5,240Q39,173,92,121Q145,69,212.5,74.5Q280,80,347,96.5Q414,113,431,181.5Q448,250,423.5,312.5Z";
  --middleToEnd: "M440.18125,321.58586Q421.20987,393.17171,351.5795,411.93958Q281.94912,430.70745,203.41732,448.4523Q124.88552,466.19715,79.91414,397.10812Q34.94276,328.01908,45.31875,253.4523Q55.69473,178.88552,101.36009,125.4682Q147.02544,72.05088,212.5159,81.00636Q278.00636,89.96184,335.58586,109.91096Q393.16535,129.86009,426.15899,189.93004Q459.15263,250,440.18125,321.58586Z";
  --end: var(--start);

  animation: 10s linear 0s infinite normal both running move_blobs;
}

@media (prefers-reduced-motion) {
  #svg_path {
    animation: none;
  }
}

#stop_one {
  stop-color: var(--primary-blob);
}

#stop_two {
  stop-color: var(--secondary-blob);
}

/* 
  I dont think I can pass in the paths as props 
  [I tried this](https://stackoverflow.com/questions/42872002) but it doesn't seem to work.
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
