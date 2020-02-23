import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import Apoc from '../public/static/img/Apoc.jpg';
import KT from '../public/static/img/KT.jpg';
import Warcry from '../public/static/img/Warcry.jpg';

const items = [
  {
    src: Apoc,
    altText: 'Warhammer40k Apocalypse',
    caption: '',
    header: '',
    key: '1',
  },
  {
    src: KT,
    altText: 'Warhammer 40k Kill Team',
    caption: '',
    header: '',
    key: '2',
  },
  {
    src: Warcry,
    altText: 'WarhammerAoS Warcry',
    caption: '',
    header: '',
    key: '3',
  },
];

const Example = () => <UncontrolledCarousel items={items} />;

export default Example;
