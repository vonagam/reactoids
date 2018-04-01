'use strict';

import { configure, storiesOf } from '@storybook/react';

import { withInfo } from '@storybook/addon-info';

import { action } from '@storybook/addon-actions';

import * as knobs from '@storybook/addon-knobs';

import LinkTo from '@storybook/addon-links/react';

import { setOptions } from '@storybook/addon-options';

import _clone from 'lodash/clone';

import addReadmeStory from './helpers/addReadmeStory';


window.StoriesOf = storiesOf;

window.WithInfo = withInfo;

window.Action = action;

window.Knobs = knobs;

window.PropsKnob = ( props ) => {

  return _clone( knobs.object( 'props', props ) );

};

window.LinkTo = LinkTo;

window.setOptions = setOptions;

window.addReadmeStory = addReadmeStory;


setOptions( { addonPanelInRight: true } );


const req = require.context( process.env.REACTOIDS_PACKAGE + '/sources/', true, /story\.js$/ );

const loadStories = function() {

  req.keys().forEach( req );

};

configure( loadStories, module );
