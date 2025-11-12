import { createLowlight } from 'lowlight'; // 1. Import createLowlight
import html from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';

const lowlight = createLowlight(); // 2. Call the function to create the object

// Register the languages you want to support
lowlight.register('html', html);
lowlight.register('css', css);
lowlight.register('javascript', javascript);
lowlight.register('typescript', typescript);

export default lowlight;