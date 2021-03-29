# Developer's Notes

## react-hexgrid

react-hexgrid is ported to typescript, none of its drag and drop functionality has survived.

I made a one-wrapper version, and after rolling over the Basic Board and Custom Board, I can see the advantages of 2 wrappers.

Notice on the custom board, multiple hex layouts are in the same svg, you can't do that if the Hexgrid isn't decoupled from the Layout. So prolly stick with 2.
