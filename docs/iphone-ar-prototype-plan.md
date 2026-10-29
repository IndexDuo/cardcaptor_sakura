# UF Card Capture: iPhone AR prototype roadmap

Status: proposed plan for review, 2026-10-28. No Unity prototype or field validation has been completed.

## Project goal

Explore an illustrated University of Florida campus map, investigate one magical anomaly at a time, capture its manifestation with a sustained touch, and collect a beautifully finished card. Target the owner's iPhone 17 first. A MacBook is available for Xcode builds; the current agent workspace is Windows.

The first question is whether this interaction is enjoyable and works on the actual phone. Detailed modeling follows that evidence.

## Accepted direction and boundaries

- iPhone first; Android is outside the first prototype.
- Unity + AR Foundation + Apple ARKit XR Plug-in is the proposed runtime.
- Camera encounter, wand UI, press-and-hold capture, spell subtitles, card reveal, swipe-to-collect, local collection.
- Silent experience. Haptics are desired and must be tested while the AR camera is active.
- One anomaly at a time per player. Captures do not globally remove encounters for other players.
- Existing approved frame/card art should be reused through lightweight exports; detailed Illustrator masters remain separate.
- No reliance on QR codes, installed beacons, AirTags, or other hardware left on campus.
- The Figma magical-circle animation is explicitly deferred beyond beta.
- Accounts, cloud saves, multiplayer, trading, monetization, App Store submission, and a complete campus/card catalog are deferred.
- Neither generating a video nor creating a detailed character is a prerequisite for testing the game.

## Separate the three positioning problems

1. Campus approach: latitude/longitude and a configurable radius identify an approximate encounter area.
2. Building/floor/door verification: not proven. A larger radius cannot distinguish a restaurant entrance from the floor below it.
3. Local AR encounter: once unlocked, ARKit tracks a spirit in the player's nearby space during the session.

AirTag-style precision finding uses a physical Ultra Wideband peer/accessory. A virtual latitude/longitude target has no transmitter. We can imitate the broad interface language of distance and direction, but must not label GPS/compass guidance as precise AirTag finding.

Outside, display approximate distance/bearing when the measurements are useful. Near or inside buildings, prefer an area and a clue over a falsely precise left/right arrow. Keep player-position uncertainty visible to the developer and avoid implying that a straight-line bearing is a walkable route.

For the initial location test, building proximity unlocks an investigation area. A third-floor clue may guide the player, but it does not constitute verified floor detection. If exact restaurant-door or third-floor enforcement is essential, that becomes a separate feasibility gate before detailed asset production. Do not silently replace this requirement with an approximation.

Possible later experiments: supported Core Location floor readings; relative barometric ascent from a known starting point; recognition of an existing visual landmark, with no placed marker. These need field validation. None is an accepted reliable indoor solution yet. Relative ascent cannot identify a floor when a player opens the app already upstairs.

AR objects initially use session-local placement. Persistent placement at exactly the same restaurant table across devices and visits is a separate, deferred localization problem.

## Development setup

Shortest first-build route: install Xcode and Unity Hub/one stable supported Unity LTS release on the MacBook. Include iOS Build Support and compatible AR Foundation/ARKit packages. Check Mac model, macOS, Xcode, Unity, and iPhone iOS compatibility before downloading a large toolchain.

Windows Unity authoring is optional after the first phone build works. Use the identical Unity editor version on both computers and share project source through Git. Commit Assets with their .meta files, Packages, and ProjectSettings; exclude generated Library, Temp, Logs, and Builds. Add Git LFS only when binary assets justify it.

Use a free Apple Personal Team for the initial personal-device build, with Developer Mode and camera/location permissions as required. Free provisioning expires after seven days and requires reprovisioning/reinstallation. Paid Apple membership is not a prerequisite for this local test. App Store/TestFlight distribution is a later decision.

The current session has not established tool access to the Mac, Unity, or Blender. Mac installation/signing/build steps must run there. MCP is optional automation, not a dependency for the game:
- Community Unity MCP can manage editor objects/scenes/scripts.
- Community Blender MCP can assist asset creation.
- Blender is an asset authoring tool; Unity runs the game.
- Do not install or assume either integration is connected merely because this plan lists it.

## Milestones and evidence gates

All milestones below are unstarted. Dates are not promised; each stage ends with evidence and a decision.

### M0 — Run our own build on the iPhone

Deliverable: a minimal Unity project and repeatable Mac-to-iPhone build instructions.

- [ ] Record actual Mac model/macOS, iPhone iOS, Xcode, Unity, and package versions.
- [ ] Install and launch a personal development build on the iPhone 17.
- [ ] Exercise camera permission granted/denied and app background/resume.
- [ ] Trigger a native haptic test.
- [ ] Record installation steps, signing limitations, and any blockers.

Pass: the app launches on the physical phone and a second build/install can be repeated. No production art is needed.

### M1 — Prove the risky location and AR behavior

Deliverable: a diagnostic scene with a placeholder orb, readable measurements, and a completed field-test report.

- [ ] Show coordinates, horizontal accuracy, sample age, heading accuracy when available, altitude/uncertainty, and optional floor/relative-altitude readings.
- [ ] Store one encounter as latitude, longitude, configurable arrival radius, clue, and anomaly ID.
- [ ] Test an outdoor site, the intended building approach, the restaurant doorway, and the same horizontal area on adjacent floors.
- [ ] Avoid arrival-state flicker using measured accuracy, dwell/stability criteria, and an exit threshold distinct from entry. Tune from observations.
- [ ] Place the orb in local AR space; turn away/back and move around it.
- [ ] Test hold feedback and haptics while the AR camera runs. Document suppression or device-setting limitations.
- [ ] Recover from tracking loss or permission denial with a clear retry.
- [ ] Decide whether approximate area arrival is sufficient or precise indoor arrival remains mandatory.

Pass: local AR is usable on the phone; feedback works in the actual camera configuration or a limitation is explicitly accepted; field evidence supports an encounter boundary.

Decision if indoor accuracy fails: choose an approved broader area/clue design, investigate landmark-based localization, or halt that feature. Do not buy hardware or create a full character to conceal an unresolved positioning requirement.

### M2 — Make one capture enjoyable

Deliverable: one complete Windy encounter using placeholder/simple art and local storage.

- [ ] Map/clue -> investigate -> encounter -> hold -> transform -> inspect -> swipe -> collection.
- [ ] Hold progress is visible; release/target loss behavior is clear and forgiving.
- [ ] A capture is awarded exactly once; reopening the app preserves it.
- [ ] Camera permission denial, interruption, and a cancelled capture have recoverable states.
- [ ] Test two proposed hold durations and record the owner's preference.
- [ ] Play the full loop repeatedly outdoors and record friction, comfort, and whether repeating it is enjoyable.

Pass: the owner wants to repeat the encounter, collection persists, and capture/retry behavior is understandable. This is the fun test, not just a feature checklist.

### M3 — Finish one reusable visual set

Deliverable: one polished Windy capture using the approved card frame and a small modular effect library.

- [ ] Refine leaf/ribbon-like wind motion, using a small mesh/sprite set and procedural motion.
- [ ] Refine wand HUD, hold meter, transformation particles, and card reveal.
- [ ] Add view-dependent card reflections using the existing exported layers/masks; do not load Illustrator meshes into the game.
- [ ] Review captured phone video/screenshots at encounter and collection scale.
- [ ] Check sustained frame pacing, heat, memory, and battery behavior on the iPhone; set budgets from M1/M2 measurements.
- [ ] Retain editable source plus optimized exports and an asset manifest.

Pass: owner-approved visuals and acceptable observed performance. Detailed fairy anatomy, rigging, and cinematic animation remain optional.

### M4 — Prove reuse with a small campus pilot

Deliverable: three encounters built from shared systems.

- [ ] Add two manifestations by changing data/assets and small behavior variations, rather than duplicating the capture system.
- [ ] Test a wind vortex, a water ripple/orb, and a heart/petal constellation.
- [ ] Give each encounter a clue and a short interaction variation; assess whether three identical holds feel repetitive.
- [ ] Keep one active objective per player and preserve the collection across app restarts.
- [ ] Repeat field tests at different times, with interrupted sessions and weak location/tracking conditions.
- [ ] Obtain owner feedback before expanding the map or card list.

Pass: the system supports more than one card without a large custom model/animation project for every encounter.

### M5 — Decide whether to expand and distribute

Deliverable: a go/no-go scope decision based on the pilot.

- [ ] Choose whether accounts/cloud sync are now justified.
- [ ] Decide whether any persistent indoor anchors or verified floor requirement remains necessary.
- [ ] Decide whether selected spirits warrant modeled/rigged characters.
- [ ] Estimate content effort from the three finished encounters, not from imagined full-game scope.
- [ ] Decide on TestFlight/App Store membership and prepare distribution only if requested.
- [ ] Plan the magical-circle animation after beta, consistent with the owner's earlier boundary.

Pass: an explicitly approved next scope. No automatic commitment to all cards or public release.

## Minimum asset list and reuse plan

| Asset | First implementation | Reuse | When |
| --- | --- | --- | --- |
| Anomaly placeholder | Unity primitive orb with simple movement | All early tests | M1 |
| Windy manifestation | A few leaf shapes, curved wind trails, a moving luminous core | Later nature/wind effects | M2 simple / M3 polish |
| Wand | Existing/new 2D HUD image plus touch feedback | Every capture | M2 |
| Hold indicator | Progress ring or simple meter, no elaborate magical circle | Every capture | M2 |
| Spell subtitles | Short readable text with timing | Data-driven per card | M2 |
| Capture transition | Small reusable particle/scale/fade sequence | Every capture | M2 simple / M3 polish |
| Collectible card | Approved lightweight frame components plus illustration | Every card | M2/M3 |
| Card reflections | Exported masks and a view-dependent material | Shared by material type | M3 |
| Map | Temporary simple map first; later the owner's illustrated UF map with geographic registration | All encounters | M1 temporary / M4 illustration |
| Map symbols | Player, anomaly area, selected clue, collected marker | Shared | M2/M4 |
| Water manifestation | Ripple plane, small orb/droplets, simple motion | Water-related cards | M4 |
| Love manifestation | Heart/petal constellation, paired orbiting motes | Love/pair-themed cards | M4 |
| Full fairy/mascot models | Optional modeled and rigged characters | Selected later encounters | After M4 evidence |
| Elaborate magical-circle animation | Deferred | Future capture polish | After beta |

Use UF places and the card's theme to create magical environmental disturbances. A spiraling cluster of leaves can communicate Windy without a humanoid fairy. A ripple that rises into a water orb can communicate water. A heart/petal effect near a meaningful campus landmark can communicate Love without first modeling Albert and Alberta.

A short conceptual video can help review art direction. It does not test AR anchoring, capture interaction, or location accuracy. Transparent animated sprites and small procedural 3D effects are useful middle options between a video and a fully rigged character.

Do not commit to detailed models for every card. First prove that simple manifestations are emotionally satisfying. A detailed character can be a later reward/presentation layer, without replacing the encounter/progress architecture.

## Location authoring data

Each encounter needs an ID, card ID, latitude/longitude, arrival radius, exit radius, clue, spawn presentation settings, and availability state. Latitude/longitude may be entered from a map pin or recorded on-site; a phone reading taken once indoors is not unquestionable ground truth.

Radius values are tunable hypotheses. A proposed 50 m starting radius is not a guarantee of doorway detection. Record measurement quality and test adjacent floors before drawing conclusions.

Keep encounter definitions, capture state, presentation, and collection persistence separate. Include a developer-only location override for at-home interaction testing, clearly identified and disabled in normal play.

## Field-test report template

For each trial record: date/time, site/known floor, indoor/outdoor, device/iOS/build, permissions and settings, elapsed time since app start, reported accuracy/sample age, distance/bearing, arrival transitions, optional altitude/floor readings, AR tracking state/drift, haptic result, observed frame pacing/heat, outcome, and next adjustment.

Suggested initial sample: five approaches from more than one direction at the outdoor site, then repeated doorway/adjacent-floor comparisons on a second visit. This is an initial evidence sample, not a statistical guarantee.

Use a debug screen to export observations rather than guessing from the map marker. Keep precise movement traces local during the prototype unless a later design explicitly needs remote storage. Walk to a stopping point before starting the camera interaction.

## Evidence and source links

Checked 2026-10-28. Sources describe capabilities; none confirms performance at UF or completion of this project.

- [Apple Nearby Interaction](https://developer.apple.com/documentation/nearbyinteraction/): distance/direction are measured between supported physical peers/accessories.
- [Apple Core Location](https://developer.apple.com/documentation/corelocation): geographic position and associated sensor information.
- [Apple floor information](https://developer.apple.com/documentation/corelocation/clfloor): available only where the floor can be determined.
- [Apple CMAltimeter](https://developer.apple.com/documentation/coremotion/cmaltimeter): supported-device altitude updates; availability must be checked.
- [Unity iOS environment setup](https://docs.unity.com/en-us/engine/6000.3/manual/platform-specific/iphone/getting-started/ios-environment-setup): Unity generates an Xcode project; local iOS building requires macOS/Xcode.
- [Unity AR overview](https://docs.unity.com/en-us/engine/6000.3/manual/xr/support/aroverview): AR scene/session and runtime content.
- [Apple personal development account](https://developer.apple.com/help/account/basics/about-your-developer-account): personal-device provisioning and seven-day expiry.
- [Apple developer membership](https://developer.apple.com/programs/): paid distribution is separate from free personal testing.
- [Expo haptics limitations](https://docs.expo.dev/versions/latest/sdk/haptics/): camera/settings can affect feedback; verify the chosen Unity native configuration separately.
- [Community Unity MCP](https://github.com/CoplayDev/unity-mcp) and [community Blender MCP](https://github.com/ahujasid/mcp-for-blender): optional automation integrations, not connected or installed by this document.

## Next action

Confirm MacBook/macOS compatibility, then complete M0 and M1 with placeholder content. Do not start a detailed fairy/mascot modeling project before reviewing those results.
