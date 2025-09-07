# VectorAnnotator - Drawing and Annotation Tool

## Overview
VectorAnnotator is a complete drawing and annotation system that has been integrated into all lesson files. It allows students to draw, add text, and annotate lesson content directly in the browser.

## Features
- **✏️ Pen Tool** - Draw freehand annotations with smooth curves
- **T Text Tool** - Add text annotations anywhere on the page
- **🎨 Color Picker** - Choose colors for drawings and text
- **📏 Width Slider** - Adjust drawing thickness (with hover magnification)
- **🔤 Font Size** - Control text size
- **↶ Undo** - Undo last action
- **× Clear** - Clear all annotations
- **👆 Select Tool** - Select and delete annotations
- **⬇ Download** - Save as PDF with annotations

## Files Included
- `vector-annotator.css` - All styling for the toolbar and interactions
- `vector-annotator.js` - Complete JavaScript functionality
- `lesson-template.html` - Template for creating new lessons (based on human_memory_future_lesson_B2.html)

## Current Lessons with VectorAnnotator
- ✅ `aviation_careers_lesson_B2.html`
- ✅ `decision_fatigue_lesson_B2.html`
- ✅ `human_memory_future_lesson_B2.html`
- ✅ `illusion_of_choice_lesson_A2.html`
- ✅ `world_without_sleep_lesson_B2.html`

## Creating New Lessons

### Method 1: Use the Template
1. Copy `lesson-template.html` to your new lesson file
2. Update the title, subtitle, and content
3. Add your images to the appropriate folder
4. The VectorAnnotator is already included!

### Method 2: Use the Script
```bash
node create-new-lesson.js "Your Lesson Name" "Topic"
```

Example:
```bash
node create-new-lesson.js "Climate Change" "Environmental Science"
```

This creates `climate-change_lesson_B2.html` with VectorAnnotator already integrated.

### Method 3: Add to Existing Files
```bash
node add-vector-annotator.js
```

This adds VectorAnnotator to any HTML files in the directory.

## How to Use
1. Open any lesson HTML file in a browser
2. The VectorAnnotator toolbar appears on the right side
3. Select a tool (pen, text, select)
4. Draw, add text, or select existing annotations
5. Use the download button to save as PDF

## Technical Details
- **Position**: Fixed toolbar on the right side
- **Z-index**: 999999 (always on top)
- **Responsive**: Adapts to different screen sizes
- **Print-friendly**: Annotations appear in PDF exports
- **Cross-browser**: Works in all modern browsers

## Customization
- Colors: Modify CSS variables in `vector-annotator.css`
- Toolbar position: Change `right: 20px` in `#va-root-toolbar`
- Button styles: Edit `.va-btn` classes
- Animations: Modify `transform` and `transition` properties

## Troubleshooting
- **Toolbar not visible**: Check that `vector-annotator.css` is included
- **Tools not working**: Ensure `vector-annotator.js` is loaded
- **No HTML structure**: Run `node add-vector-annotator-html.js`
- **Print issues**: Check `@media print` CSS rules

## Future Development
The VectorAnnotator is fully functional and ready for production use. All lesson files now have the same professional annotation system!
