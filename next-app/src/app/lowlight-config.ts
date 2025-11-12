import lowlight from 'lowlight';
import html from 'highlight.js/lib/languages/xml'; // HTML is often registered as XML
import css from 'highlight.js/lib/languages/css';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';

// Register the languages you want to support
lowlight.register('html', html);
lowlight.register('css', css);
lowlight.register('javascript', javascript);
lowlight.register('typescript', typescript);

export default lowlight;