# @stackline/karma

> Spectacular Test Runner for JavaScript.

[![npm version](https://img.shields.io/npm/v/@stackline/karma.svg?style=flat-square)](https://www.npmjs.com/package/@stackline/karma)
[![license](https://img.shields.io/npm/l/@stackline/karma.svg?style=flat-square)](https://github.com/alexandroit/stackline-karma)
[![GitHub repository](https://img.shields.io/badge/GitHub-alexandroit%2Fstackline-karma-181717?style=flat-square&logo=github)](https://github.com/alexandroit/stackline-karma)
[![Docs](https://img.shields.io/badge/docs-alexandro.net-0f766e?style=flat-square)](https://alexandro.net/docs/vanilla/karma/)
[![Reddit community](https://img.shields.io/badge/community-r%2FStackline-ff4500?style=flat-square&logo=reddit&logoColor=white)](https://www.reddit.com/r/Stackline/)

**[Documentation](https://alexandro.net/docs/vanilla/karma/)** | **[npm](https://www.npmjs.com/package/@stackline/karma)** | **[Issues](https://github.com/alexandroit/stackline-karma/issues)** | **[Repository](https://github.com/alexandroit/stackline-karma)**

**Current package version:** `1.0.1`

---

## Why this package?

`@stackline/karma` is the Stackline-maintained distribution of `karma@6.4.4`. It is an independent continuation of [karma](https://github.com/karma-runner/karma); original authors and licenses remain credited below.

## Compatibility

| Item | Value |
| :--- | :--- |
| Package | `@stackline/karma@1.0.1` |
| API target | `karma@6.4.4` |
| Supported Node.js | `>= 10` |
| License | `MIT` |
| Main entry | `./lib/index` |
| CLI | `karma` |
| Runtime dependencies | `di, tmp, glob, mime, qjobs, yargs, braces, lodash, log4js, mkdirp, rimraf, connect, chokidar, minimatch, socket.io, http-proxy, source-map, body-parser, graceful-fs, isbinaryfile, range-parser, ua-parser-js, dom-serialize, @colors/colors` |

## Installation

```bash
npm install @stackline/karma
```

Preserve existing imports and plugin resolution with an npm alias:

```bash
npm install karma@npm:@stackline/karma
```

## Usage and API reference

### Karma


A simple tool that allows you to execute JavaScript code in multiple
_real_ browsers.

> The main purpose of Karma is to make your test-driven development easy,
>  fast, and fun.

## Karma is deprecated and is not accepting new features or general bug fixes.

The web testing space has evolved significantly in the [10+ years](https://testing.googleblog.com/2012/11/testacular-spectacular-test-runner-for.html) since Karma's creation. The web landscape looks very different today and new patterns and tools have emerged in the ecosystem. New test runners offer more performant alternatives, and Karma no longer provides clear unique value.

Based on the current state of the web testing ecosystem, we have made the hard decision to deprecate Karma.

We know Karma is used particularly commonly in the Angular ecosystem, so Angular is adding [Jest](https://jestjs.io/) and [Web Test Runner](https://modern-web.dev/docs/test-runner/overview/) support to provide a migration path off of Karma. See the [Angular blog](https://blog.angular.io/moving-angular-cli-to-jest-and-web-test-runner-ef85ef69ceca) for more details.

Critical security issues in Karma will still be triaged and fixed as necessary. This will continue until 12 months after Angular CLI's Web Test Runner support is marked stable.

For those outside Angular looking to migrate off Karma, both [Web Test Runner](https://modern-web.dev/docs/test-runner/overview/) and [`jasmine-browser-runner`](https://github.com/jasmine/jasmine-browser-runner) provide browser-based unit testing solutions which can be used as a direct alternative. [Jest](https://jestjs.io/) and [Vitest](https://vitest.dev/) also provide Node-based alternatives.

It has been incredible to see Karma's impact on the web testing ecosystem and we greatly appreciate the support of everyone who contributed to an awesome community. Keep testing. ✅


## Help and Support

> For questions and support please use the mailing list or Gitter.
> The issue tracker is for bug reports and feature discussions only.

* Obligatory [documentation]
* Quick questions:
* Longer questions: [Mailing List]
* Bug reports [Issue Tracker]
* Everything less than 140 characters: [@JsKarma] on Twitter



## When should I use Karma?

* You want to test code in *real* browsers.
* You want to test code in multiple browsers (desktop, mobile,
  tablets, etc.).
* You want to execute your tests locally during development.
* You want to execute your tests on a continuous integration server.
* You want to execute your tests on every save.
* You love your terminal.
* You don't want your (testing) life to suck.
* You want to use [Istanbul] to automagically generate coverage
  reports.
* You want to use [RequireJS] for your source files.


## But I still want to use \_insert testing library\_

Karma is not a testing framework, nor an assertion library.
Karma just launches an HTTP server, and generates the test runner HTML file you probably already know from your favourite testing framework.
So for testing purposes you can use pretty much anything you like. There are already plugins for most of the common testing frameworks:

* [Jasmine]
* [Mocha]
* [QUnit]
* and [many others](https://www.npmjs.com/search?q=keywords:karma-adapter)

If you can't find an adapter for your favourite framework, don't worry and write your own.
It's not that hard and we are here to help.


## Which Browsers can I use?

All the major browsers are supported, if you want to know more see the
[browsers] page.


## Troubleshooting
See [FAQ](https://karma-runner.github.io/latest/intro/faq.html).


## I want to use it. Where do I sign?

You don't need to sign anything but here are some resources to help
you to get started...


### Obligatory Screencast.

Every serious project has a screencast, so here is ours.  Just click
[here] and let the show begin.


### Installation.

See [installation](https://karma-runner.github.io/latest/intro/installation.html).


### Using it.

See [configuration](https://karma-runner.github.io/latest/intro/configuration.html).


## This is so great. I want to help.

Please, see
[contributing](https://karma-runner.github.io/latest/dev/contributing.html).


## Why did you create this?

Throughout the development of [AngularJS], we've been using [JSTD] for
testing. I really think that JSTD is a great idea. Unfortunately, we
had many problems with JSTD, so we decided to write our own test
runner based on the same idea. We wanted a simple tool just for
executing JavaScript tests that is both stable and fast. That's why we
use the awesome [Socket.io] library and [Node.js].


## My boss wants a license. So where is it?
[MIT License](./LICENSE)


[AngularJS]: https://angularjs.org/
[JSTD]: https://code.google.com/p/js-test-driver/
[Socket.io]: https://socket.io/
[Node.js]: https://nodejs.org/
[Jasmine]: https://github.com/karma-runner/karma-jasmine
[Mocha]: https://github.com/karma-runner/karma-mocha
[QUnit]: https://github.com/karma-runner/karma-qunit
[here]: https://www.youtube.com/watch?v=MVw8N3hTfCI
[Mailing List]: https://groups.google.com/forum/#!forum/karma-users
[Issue Tracker]: https://github.com/karma-runner/karma/issues
[@JsKarma]: https://twitter.com/JsKarma
[RequireJS]: https://requirejs.org/
[Istanbul]: https://github.com/gotwarlost/istanbul

[browsers]: https://karma-runner.github.io/latest/config/browsers.html
[documentation]: https://karma-runner.github.io


## Maintenance and compatibility notes

External HTTP(S) return navigation remains configurable for compatibility and can act as an open redirect. Script schemes are rejected. Review return URL policy before exposing the runner beyond a trusted development environment.

## Credits and original authors

- Original project: [karma](https://github.com/karma-runner/karma).
- Vojta Jína.
- Friedel Ziegelmayer.
- dignifiedquire.
- johnjbarton.
- Yaroslav Admin.
- greenkeeperio-bot.
- semantic-release-bot.
- Karma Bot.
- Maksim Ryzhikov.
- ukasz Usarz.
- Christian Budde Christensen.
- Wesley Cho.
- taichi.
- Jonathan Ginsburg.
- Liam Newman.
- lukasz.
- Anton.
- Michał Gołębiowski-Owczarek.
- Todd Wolfson.
- Mark Trostler.
- Ciro Nunes.
- Pawel Kozlowski.
- Robo.
- Shyam Seshadri.
- Tim Cuthbertson.
- Daniel Compton.
- Mark Ethan Trostler.
- Mourad.
- Brian Di Palma.
- Georgii Dolzhykov.
- Kim Joar Bekkelund.
- Matthias Oßwald.
- Nick Malaguti.
- falsandtru.
- joshjb84.
- vivganes.
- Andrew Martin.
- Aymeric Beaumet.
- Brian Ford.
- Chris Casola.
- Chris Hunt.
- Daniel Aleksandersen.
- David Souther.
- Ilya Volodin.
- Iristyle.
- Jake Champion.
- Jeff Jewiss.
- Jérémy Judéaux.
- Marcello Nuccio.
- Nico Jansen.
- Pieter Mees.
- Sergei Startsev.
- Tobias Speicher.
- dependabot[bot].
- pavelgj.
- sylvain-hamel.
- ywong.
- Andrew Morris.
- Aseem Bansal.
- Bryan Smith.
- Bulat Shakirzyanov.
- ChangZhuo Chen.
- Chris Bottin.
- Cyrus Chan.
- DarthCharles.
- David Herges.
- David Pärsson.
- Ethan J. Brown.
- Ezra Brooks.
- Filipe Guerra.
- Greenkeeper.
- Hugues Malphettes.
- Igor Minar.
- Ilya Goncharov.
- James Ford.
- James Talmage.
- Janderson Constantino.
- Jonas Pommerening.
- Jonathan Freeman.
- Josh.
- KJ Tsanaktsidis.
- Keen Yee Liau.
- Kelly Jensen.
- Kevin Huang.
- Kevin WENNER.
- Levi Thomason.
- Luke Page.
- Matt Lewis.
- Parashuram.
- Pat Tullmann.
- PatrickJS.
- Paul Gschwendtner.
- Richard Harrington.
- Roarke Gaskill.
- Robert Stein.
- Robin Liang.
- Ruben Bridgewater.
- Réda Housni Alaoui.
- Sammy Jelin.
- Sergey Simonchik.
- Shane Russell.
- Stefan Dragnev.
- Steve Mao.
- Steve Van Opstal.
- Sylvain Hamel.
- SymbioticKilla.
- Terry.
- Thomas Parisot.
- Tim Gates.
- Tom Erik Støwer.
- Vivek Ganesan.
- Vladimir Starkov.
- comdiv.
- karmarunnerbot.
- ngiebel.
- rdodev.
- u812.
- Aaron Powell.
- Adrien Crivelli.
- Alan Agius.
- Alejandro Mantecon Guillen.
- Ales Rosina.
- Alexander Pepper.
- Alexander Shtuchkin.
- Alexei.
- Ameer Jhan.
- Anders Ekdahl.
- Anders Janmyr.
- Andreas Krummsdorf.
- Andreas Pålsson.
- Andrew Fischer.
- Andrew Marcinkevičius.
- Andrey Chalkin.
- Andy Joslin.
- Anton Usmansky.
- Athur Ming.
- Atul Bhosale.
- AugustinLF.
- AvnerCohen.
- Awad Mackie.
- Basemm.
- Benoit Charbonnier.
- Bhavesh Kakadiya.
- Borewit.
- Brady Wied.
- Bram Borggreve.
- Breno Calazans.
- Brian Donovan.
- Brian M Hunt.
- Cagdas Bayram.
- Carl Goldberg.
- Chad Smith.
- Chang Wang.
- Charles Suh.
- Chelsea Urquhart.
- Chris.
- Chris Chua.
- Chris Dawson.
- Christian Weiss.
- Christopher Hiller.
- Chuf.
- Ciro S. Costa.
- Daan Stolp.
- Damien Choizit.
- Dan Siwiec.
- Dan Thareja.
- Danny Croft.
- Danny Tuppeny.
- David Hyde.
- David Jensen.
- David M. Karr.
- Derek Gould.
- Derek Schaller.
- Dieter Oberkofler.
- Dillon.
- Dmitrii Abramov.
- Dmitriy Ryajov.
- Donovan Hutchinson.
- Douglas Blumeyer.
- Dunja Radulov.
- ERt.
- Ed Rooth.
- Eddie Monge.
- Eden.
- Edward Hutchins.
- Eldar Jafarov.
- Eric Baer.
- Esteban Marin.
- Evgeniy Chekan.
- Fabian Beuke.
- Filipe Silva.
- Franck Garcia.
- Fred Sauer.
- Frederic Hemberger.
- Fredrik Bonander.
- Gavin Aiken.
- Geert Van Laethem.
- Glenn Anderson.
- Greg Thornton.
- Gregory Cowan.
- Hendrik Purmann.
- Homa Wong.
- Igor Lima.
- Islam Sharabash.
- Jack Tarantino.
- Jacob Trimble.
- Jakub Z.
- James Shore.
- Jan Molak.
- Jeff Froom.
- Jeff Lage.
- Jeff Yates.
- Jeremy Axelrod.
- Jerry Reptak.
- Jesse M. Holmes.
- Joe Lencioni.
- Johannes Gorset.
- John Wehr.
- Jon Bretman.
- Jonathan ES Lin.
- Jonathan Felchlin.
- Jonathan Kingston.
- Jonathan Niles.
- Josh Lory.
- João Marcos Duarte.
- Julian Connor.
- Julie Ralph.
- Jurko Gospodnetić.
- Justin Ridgewell.
- KahWee Teng.
- Karl Lindmark.
- Karol Fabjańczuk.
- Karolis Narkevicius.
- Keats.
- Keith Cirkel.
- Kent C. Dodds.
- Kevin Ortman.
- Kostiantyn Kahanskyi.
- Kris Kowal.
- Lachlan Heywood.
- Lenny Urbanowski.
- Long Ho.
- LoveIsGrief.
- Lucas Theisen.
- Lukasz Zatorski.
- M1xA.
- Magnus Markling.
- Manfred Stock.
- Manoel.
- Marko Anastasov.
- Martin Geisler.
- Martin Jul.
- Martin Lemanski.
- Martin Probst.
- Marvin Heilemann.
- Matias Niemelä.
- Matthew Amato.
- Matthew Cale.
- Matthew Machuga.
- Matti Paksula.
- Mattijs Kneppers.
- Max Rose.
- Max Waterman.
- Merott Movahedi.
- Merrick Christensen.
- Michael Krotscheck.
- Michael Vartan.
- Michał Siwek.
- Milan Aleksic.
- Milana Stojadinov.
- Mohamed Eltuhamy.
- Nathan Cornelius.
- Nathan Hunzaker.
- NeverwinterMoon.
- Nick Carter.
- Nick McCurdy.
- Nick Payne.
- Nick Petruzzelli.
- Nick Williams.
- Nicolas Artman.
- Nicolas Ferrero.
- Nikita Balakirev.
- Nir Moav.
- Nish.
- Nuno Job.
- Oleg Gomozov.
- Olivier Yiptong.
- OniOni.
- OpenShift guest.
- Outsider.
- Pascal Hartig.
- Patrick Lussan.
- Patrick Neschkudla.
- Patrik Henningsson.
- Paweł Kapalla.
- Payam Valadkhan.
- Pedro Araujo.
- Pete Bacon Darwin.
- Pete Swan.
- Peter Burns.
- Peter Halliday.
- Peter McAlpine.
- Peter Newman.
- Peter Yates.
- Philip Harrison.
- Pierre Vanduynslager.
- Piotr Błażejewicz.
- Piper Chester.
- Rafal Lindemann.
- Remy Sharp.
- Ricardo Melo Joia.
- Rich Kuzsma.
- Rich Trott.
- Richard Herrera.
- Rob Cherry.
- Rob Dodson.
- Rogério Vicente.
- Rémi.
- Sahat Yalkabov.
- Sam Rawlins.
- Samuel Marks.
- Saugat Acharya.
- Schmulik Raskin.
- Sergey Kruk.
- Seth Rhodes.
- Shahar Mor.
- Shane Osbourne.
- Sho Ikeda.
- Sibiraj.
- Simen Bekkhus.
- Simon Warta.
- Simone Gentili.
- Slava Kotiya.
- Sophie Cooper.
- Stefan Becking.
- Stephen Hazleton.
- Stuart Memo.
- Taylor Buley.
- Taylor Hakes.
- Terin Stock.
- Thai Pangsakulyanont @ Taskworld.
- Thijs Triemstra.
- Tim Hartman.
- Tim Olshansky.
- Timo Tijhof.
- Tom MacWright.
- TrevDev.
- Tyler Akins.
- Vasily Ostanin.
- Veronica Lynn.
- Vincent Taverna.
- Vitor Buzinaro.
- Volune.
- Vova Bilonenko.
- Wizek.
- XhmikosR.
- Yang09701194.
- Yaniv Efraim.
- Yi Wang.
- Yvonne Yip.
- Zhang zhengzheng.
- adamnation.
- ahaurw01.
- ashaffer.
- cexbrayat.
- coderaiser.
- compact.
- coridrew.
- cy6erskunk.
- david-garcia-nete.
- deepak1556.
- dorey.
- grifball.
- hdmr14.
- hrgdavor.
- ianjobling.
- inf3rno.
- is-already-taken.
- jjoos.
- jvalkeejarvi.
- katrina95.
- kyo_ago.
- lanshunfang.
- lusarz.
- maik.
- mdemo.
- nathanfaucett.
- pardoman.
- sharmanikhil04.
- thetrevdev.
- thorn0.
- toran billups.
- xel23.
- chalkerx@gmail.com>.
- weiran.zsd@outlook.com>.
- Copyright (C) 2011-2021 Google, Inc.
- Stackline maintenance: [Alexandro Paixao Marques](https://www.linkedin.com/in/aleinfo/) and [Stackline contributors](https://github.com/alexandroit).

Original copyright, license notices and contributor acknowledgements remain part of this distribution. Stackline maintenance does not replace authorship of the original work.

## License

`MIT`. See the license and notice files in the [repository](https://github.com/alexandroit/stackline-karma).

## Community and Links

- [Stackline website](https://alexandro.net/)
- [GitHub projects](https://github.com/alexandroit)
- [npm packages](https://www.npmjs.com/~alex360qc)
- [Reddit community — r/Stackline](https://www.reddit.com/r/Stackline/)
- [Maintainer LinkedIn](https://www.linkedin.com/in/aleinfo/)

Use this repository's issue tracker for reproducible bugs and feature requests. Join r/Stackline for examples, usage questions and release discussions.
