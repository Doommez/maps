import { h } from 'vue';
import '../styles/components/BaseBlock.scss';

const BaseBlock = (props, context) => h('div', {class: 'block'}, [context.slots.default ? context.slots.default() : '']);

export default BaseBlock;
