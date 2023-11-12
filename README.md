# Monster Hunter Forge

Built using React and TailwindCSS; MHForge is an assistant app for the game Monster Hunter Now, it allows users to create custom builds, filter by required skills and save/load gearsets.

## Deployment link

[Live link to project](https://mhforge.netlify.app/)

## Table of Contents
* [Overview](#overview)
* [Technologies Used](#technologies-used)
* [Brief](#brief)
* [Build Process](#build-process)
  * [Shape the Data](#shape-the-data)
  * [Mock landing](#mock-landing)
  * [Initial display](#initial-display)
  * [Finished product](#finished-product)
    * [Desktop](#desktop)
    * [Mobile](#mobile)
* [Summary](#summary)
  * [Challenges](#challenges)
  * [Wins](#wins)
  * [Key Learnings](#key-learnings)
  * [Future Improvements](#future-improvements)

## Overview

MHForge is a side-project I have worked on during my job search in order to continue to practice using react and tailwind whilst also exploring react-select and vite.

## Technologies used

### Tech
HTML, CSS, Javascript, React, TailwindCSS, Vite

### Design
Figma

## Build process

### Shape the Data

Data was initially available in a csv format which I processed into JSON using [CSV to JSON](https://www.convertcsv.com/csv-to-json.htm)



#### Desktop

![Desktop final main]()


#### Mobile

![Desktop final main]()


## Summary

### Challenges

Dynamically styling tailwindCSS required creating lists to pre-initialise the class styles so that tailwind can understand the styles that are being created
This could be improved by using tailwind.config.

### Wins

The filter bar for selecting skills is animated, has colors based on the skill name and carries over between weapon and armor displays

### Key Learnings

Styling react-select using colorStyles and separating out styling into different objects. This can be improved by combining with tailwind class styling instead of CSS.


### Future Improvements

- Create and add a better logo

- Change mobile armor view to allow users to further filter by slot and expand the width of the cards to allow for full names on a smaller screen