# Developer's Notes

## `GameSetup.tsx`

This is what I'm about to tackle. We want the game to be 6 player (WOW!) possibly? Switching names, switching colors, adding game options. Eventually gotta make this sync with hexedMeadow/Battlescape style setup. But this will be fun :)

Maybe instead of names (think about mature content and evil-doers!) players can choose Icons? We'll see.

And armies, huh?

_NOTE_ While working on GameSetup, I wonder in `useBgioG.tsx` if there isn't advantages to spreading the properties into the provided context value, instead of nested under G. 🤔

## Different Games Interface -- how to switch games in this or similar repos

The `SetupDataType` is what gets used to create a match. The `setup` function in the actual game file receives that data as props.
This data type will get imported into `useBgioLobbyApi.tsx` because our createMatch function will need the type of setupData to accept.
Also the `useMultiplayerLobby.tsx` hook because it needs to set the type of its handler for creating matches. AND it needs an instance of multiplayerSetupData, unless we want to pass that in from the frontend, which we may. Either way, it needs to pass something of SetupDataType to the bgio-api createMatch.

Perhaps there's a way to do this typing stuff dynamically in typescript? The way `BoardProps` does in the `Board.tsx` file. We pass it our G-type, it uses that in the shaping of its own type. Some kinda polymorph, witchcraft, ENVIABLE heresy.
Note: Must switch this when using different games.

Furthermore, if we do this correctly in `Board.tsx`, is it necessary to import the G-type in `useBgioG.tsx` ? Currently though, we do, so remember `useBgioG.tsx` when switching out games.

## react-hexgrid

react-hexgrid is ported to typescript, none of its drag and drop functionality has survived.

I made a one-wrapper version, and after rolling over the Basic Board and Custom Board, I can see the advantages of 2 wrappers.

Notice on the custom board, multiple hex layouts are in the same svg, you can't do that if the Hexgrid isn't decoupled from the Layout. So, probably stick with 2!

Also noticed when strict mode got turned on, it pretty much didn't work. Something about params passed to Path, `never` came up, `null` and `undefined` are homies but not reciprocal polymorphs. Ya dig?
