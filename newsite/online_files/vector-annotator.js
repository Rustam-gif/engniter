// VectorAnnotator - Reusable Drawing and Annotation Tool
// Add this script to any lesson HTML file to enable drawing and text annotation

document.addEventListener('DOMContentLoaded', function() {
  // Get existing elements
  const toolbar = document.getElementById('va-root-toolbar');
  const overlay = document.getElementById('va-root-overlay');
  const svg = document.getElementById('va-svg');
  const content = document.getElementById('va-content');
  const ui = document.getElementById('va-ui');
  
  if (!toolbar || !overlay || !svg || !content || !ui) {
    console.error('VectorAnnotator elements not found');
    return;
  }

  // State
  const state = {
    tool: 'passthru', // Select tool pre-selected
    color: '#057A8A', // RGB(5, 122, 138) - teal color
    width: 3,
    fontSize: 24,
    passThrough: false,
    overlay: overlay,
    svg: svg,
    content: content,
    ui: ui,
    history: [],
    redo: [],
    editing: null,
    caret: null
  };

  // Double-click detection
  let clickTimeout = null;
  let clickCount = 0;

  // Update SVG viewBox and handle scrolling
  const fitViewBox = () => {
    const rect = overlay.getBoundingClientRect();
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    // Set viewBox to match the current viewport with scroll offset
    svg.setAttribute('viewBox', `${scrollX} ${scrollY} ${rect.width} ${rect.height}`);
  };
  
  // Handle window resize and scroll
  const handleResize = () => {
    fitViewBox();
  };
  
  const handleScroll = () => {
    fitViewBox();
    // Update caret position for live text editing
    if (state.editing) {
      positionCaret();
    }
  };
  
  new ResizeObserver(handleResize).observe(overlay);
  window.addEventListener('resize', handleResize);
  window.addEventListener('scroll', handleScroll);
  fitViewBox();

  // Pointer helpers - convert to document coordinates
  const svgPoint = (evt) => {
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    return {
      x: evt.clientX + scrollX,
      y: evt.clientY + scrollY
    };
  };

  // History helpers
  const pushAdd = (el) => {
    state.history.push({ t: 'add', el });
    state.redo.length = 0;
  };

  const undo = () => {
    const last = state.history.pop();
    if (!last) return;
    if (last.t === 'add') {
      last.el.remove();
      state.redo.push(last);
    }
  };

  // Custom cursor management
  let customCursor = null;
  let penCursor = null;
  
  const createCustomCursor = () => {
    if (customCursor) return;
    customCursor = document.createElement('div');
    customCursor.className = 'text-cursor';
    document.body.appendChild(customCursor);
  };
  
  const removeCustomCursor = () => {
    if (customCursor) {
      customCursor.remove();
      customCursor = null;
    }
  };
  
  const createPenCursor = () => {
    if (penCursor) return;
    penCursor = document.createElement('div');
    penCursor.className = 'pen-cursor';
    penCursor.innerHTML = '✏';
    document.body.appendChild(penCursor);
    
    // Add a specific mousemove listener for the pen cursor
    const penMouseMove = (e) => {
      if (penCursor) {
        penCursor.style.left = e.clientX + 'px';
        penCursor.style.top = e.clientY + 'px';
      }
    };
    
    document.addEventListener('mousemove', penMouseMove);
    penCursor._mouseMoveHandler = penMouseMove;
  };
  
  const removePenCursor = () => {
    if (penCursor) {
      // Remove the specific mousemove listener
      if (penCursor._mouseMoveHandler) {
        document.removeEventListener('mousemove', penCursor._mouseMoveHandler);
      }
      penCursor.remove();
      penCursor = null;
    }
  };
  
  const updateCustomCursor = (e) => {
    if (customCursor) {
      customCursor.style.left = e.clientX + 'px';
      customCursor.style.top = e.clientY + 'px';
    }
    if (penCursor) {
      penCursor.style.left = e.clientX + 'px';
      penCursor.style.top = e.clientY + 'px';
    }
  };

  // Tool switching
  const setTool = (tool) => {
    state.tool = tool;
    
    // First, remove active class from all tool buttons
    document.querySelectorAll('[data-tool]').forEach(btn => {
      btn.classList.remove('va-active');
    });
    
    // Handle pass-through tool state
    const passBtn = document.getElementById('va-passthru');
    if (passBtn) {
      if (tool === 'passthru') {
        // Toggle pass-through mode
        state.passThrough = !state.passThrough;
        if (state.passThrough) {
          passBtn.classList.add('va-active');
          overlay.style.pointerEvents = 'none';
        } else {
          passBtn.classList.remove('va-active');
          overlay.style.pointerEvents = 'auto';
          state.tool = null; // Reset tool when deactivating
        }
      } else {
        // Deactivate pass-through mode when other tools are selected
        passBtn.classList.remove('va-active');
        state.passThrough = false;
        overlay.style.pointerEvents = 'auto';
      }
    }
    
    // Then, add active class only to the selected tool (if tool is not null and not passthru)
    if (tool && tool !== 'passthru') {
      const selectedBtn = document.querySelector(`[data-tool="${tool}"]`);
      if (selectedBtn) {
        selectedBtn.classList.add('va-active');
      }
    }
    
    if (state.editing) finishText(true);
    
    // Hide cursor when not using text tool
    if (tool !== 'text' && state.caret) {
      state.caret.remove();
      state.caret = null;
    }
    
    // Manage custom cursor
    if (tool === 'text') {
      removePenCursor(); // Remove pen cursor first
      createCustomCursor();
      document.body.classList.add('text-tool-active');
      document.body.classList.remove('pen-tool-active');
    } else if (tool === 'pen') {
      removeCustomCursor(); // Remove text cursor first
      createPenCursor();
      document.body.classList.add('pen-tool-active');
      document.body.classList.remove('text-tool-active');
    } else {
      removeCustomCursor();
      removePenCursor();
      document.body.classList.remove('text-tool-active');
      document.body.classList.remove('pen-tool-active');
    }
    
    // Reset insertion index when switching away from text tool
    if (tool !== 'text') {
      state.insertionIndex = undefined;
    }
  };

  // Text functions
  const updateCaretColor = () => {
    if (state.caret) state.caret.setAttribute('stroke', state.color);
    if (state.editing) state.editing.setAttribute('fill', state.color);
  };

  const textLen = () => {
    return state.editing ? state.editing.getComputedTextLength() : 0;
  };

  const positionCaret = () => {
    if (!state.editing || !state.caret) return;
    const baseX = parseFloat(state.editing.getAttribute('x'));
    const y = parseFloat(state.editing.getAttribute('y'));
    const fs = parseFloat(state.editing.getAttribute('font-size'));
    
    // Use insertion index if available, otherwise use end of text
    let caretX;
    if (state.insertionIndex !== undefined) {
      // Calculate position based on insertion index
      const textContent = state.editing.textContent;
      const beforeText = textContent.substring(0, state.insertionIndex);
      
      // Create temporary text to measure position
      const tempText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      tempText.setAttribute('x', baseX);
      tempText.setAttribute('y', y);
      tempText.setAttribute('font-size', fs);
      tempText.setAttribute('font-family', state.editing.getAttribute('font-family'));
      tempText.setAttribute('dominant-baseline', state.editing.getAttribute('dominant-baseline'));
      tempText.textContent = beforeText;
      
      // Temporarily add to measure
      ui.appendChild(tempText);
      caretX = baseX + tempText.getComputedTextLength();
      ui.removeChild(tempText);
    } else {
      // Default to end of text
      caretX = baseX + textLen() + 1.5;
    }
    
    state.caret.setAttribute('x1', caretX);
    state.caret.setAttribute('y1', y);
    state.caret.setAttribute('x2', caretX);
    state.caret.setAttribute('y2', y + fs);
  };

  const beginText = (x, y) => {
    if (state.editing) finishText(true);
    
    state.editing = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    state.editing.setAttribute('x', x);
    state.editing.setAttribute('y', y);
    state.editing.setAttribute('fill', state.color);
    state.editing.setAttribute('font-size', state.fontSize);
    state.editing.setAttribute('font-family', 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif');
    state.editing.setAttribute('dominant-baseline', 'hanging');
    state.editing.setAttribute('class', 'va-text-element');
    state.editing.textContent = '';
    content.appendChild(state.editing);
    
    // Reset insertion index for new text
    state.insertionIndex = undefined;
    
    state.caret = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    state.caret.setAttribute('class', 'va-caret');
    state.caret.setAttribute('stroke', state.color);
    state.caret.setAttribute('stroke-width', 1);
    ui.appendChild(state.caret);
    positionCaret();
    
    window.addEventListener('keydown', onType);
  };

  const continueText = (existingTextElement, clickX, clickY) => {
    if (state.editing) finishText(true);
    
    // Set the existing text element as the one we're editing
    state.editing = existingTextElement;
    
    // Calculate cursor position based on click location
    const textX = parseFloat(existingTextElement.getAttribute('x'));
    const textY = parseFloat(existingTextElement.getAttribute('y'));
    const fontSize = parseFloat(existingTextElement.getAttribute('font-size'));
    const textContent = existingTextElement.textContent;
    
    // Convert click coordinates to SVG coordinates
    const svgRect = svg.getBoundingClientRect();
    const clickSvgX = ((clickX - svgRect.left) / svgRect.width) * parseFloat(svg.getAttribute('viewBox').split(' ')[2]);
    const clickSvgY = ((clickY - svgRect.top) / svgRect.height) * parseFloat(svg.getAttribute('viewBox').split(' ')[3]);
    
    // Find the best insertion point
    let bestIndex = textContent.length; // Default to end
    let minDistance = Math.abs(clickSvgX - (textX + existingTextElement.getComputedTextLength()));
    
    // Check each character position
    for (let i = 0; i <= textContent.length; i++) {
      // Create a temporary text element to measure position
      const tempText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      tempText.setAttribute('x', textX);
      tempText.setAttribute('y', textY);
      tempText.setAttribute('font-size', fontSize);
      tempText.setAttribute('font-family', existingTextElement.getAttribute('font-family'));
      tempText.setAttribute('dominant-baseline', existingTextElement.getAttribute('dominant-baseline'));
      tempText.textContent = textContent.substring(0, i);
      
      // Temporarily add to measure
      ui.appendChild(tempText);
      const charX = textX + tempText.getComputedTextLength();
      ui.removeChild(tempText);
      
      // Calculate distance from click point
      const distance = Math.abs(clickSvgX - charX);
      
      if (distance < minDistance) {
        minDistance = distance;
        bestIndex = i;
      }
    }
    
    // Store the insertion index for typing
    state.insertionIndex = bestIndex;
    
    // Create caret at the calculated position
    state.caret = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    state.caret.setAttribute('class', 'va-caret');
    state.caret.setAttribute('stroke', state.color);
    state.caret.setAttribute('stroke-width', 1);
    ui.appendChild(state.caret);
    positionCaret();
    
    window.addEventListener('keydown', onType);
  };

  const finishText = (commit) => {
    if (!state.editing) return;
    window.removeEventListener('keydown', onType);
    if (!commit || state.editing.textContent.trim() === '') {
      state.editing.remove();
    } else {
      pushAdd(state.editing);
    }
    if (state.caret) {
      state.caret.remove();
      state.caret = null;
    }
    state.editing = null;
  };

  const onType = (e) => {
    if (!state.editing) return;
    if (e.key === 'Enter') {
      finishText(true);
      e.preventDefault();
      return;
    }
    if (e.key === 'Escape') {
      finishText(false);
      e.preventDefault();
      return;
    }
    if (e.key === 'Backspace') {
      if (state.insertionIndex !== undefined && state.insertionIndex > 0) {
        // Delete character before cursor
        const text = state.editing.textContent;
        state.editing.textContent = text.substring(0, state.insertionIndex - 1) + text.substring(state.insertionIndex);
        state.insertionIndex--;
      } else {
        // Default behavior - delete from end
        state.editing.textContent = state.editing.textContent.slice(0, -1);
      }
      positionCaret();
      e.preventDefault();
      return;
    }
    if (e.key && e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
      if (state.insertionIndex !== undefined) {
        // Insert character at cursor position
        const text = state.editing.textContent;
        state.editing.textContent = text.substring(0, state.insertionIndex) + e.key + text.substring(state.insertionIndex);
        state.insertionIndex++;
      } else {
        // Default behavior - append to end
        state.editing.textContent += e.key;
      }
      positionCaret();
      e.preventDefault();
    }
  };

  // Drawing variables
  let drawing = false;
  let points = [];
  let pathEl = null;
  let hitArea = null;
  let pid = null;

  // Drawing functions
  const dist2 = (a, b) => {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return dx * dx + dy * dy;
  };

  const MIN_D2 = 1.5 * 1.5;

  const pathFrom = (pts) => {
    if (pts.length < 2) return '';
    let d = `M ${pts[0].x} ${pts[0].y}`;
    if (pts.length === 2) return d + ` L ${pts[1].x} ${pts[1].y}`;
    for (let i = 1; i < pts.length - 1; i++) {
      const p0 = pts[i];
      const p1 = pts[i + 1];
      const mx = (p0.x + p1.x) / 2;
      const my = (p0.y + p1.y) / 2;
      d += ` Q ${p0.x} ${p0.y} ${mx} ${my}`;
    }
    const last = pts[pts.length - 1];
    d += ` L ${last.x} ${last.y}`;
    return d;
  };

  const onDown = (e) => {
    if (state.passThrough) return;
    if (e.button !== undefined && e.button !== 0) return;
    if (state.tool === 'pen') {
      drawing = true;
      pid = e.pointerId;
      svg.setPointerCapture(pid);
      const p = svgPoint(e);
      points = [p];
      pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      pathEl.setAttribute('class', 'stroke va-path-element');
      pathEl.setAttribute('stroke', state.color);
      pathEl.setAttribute('stroke-width', state.width);
      pathEl.setAttribute('d', `M ${p.x} ${p.y}`);
      content.appendChild(pathEl);
      
      // Create invisible hit area for easier selection
      hitArea = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      hitArea.setAttribute('class', 'va-path-hit-area');
      hitArea.setAttribute('stroke', 'transparent');
      hitArea.setAttribute('stroke-width', Math.max(20, state.width * 4)); // Much larger hit area
      hitArea.setAttribute('d', `M ${p.x} ${p.y}`);
      hitArea.setAttribute('fill', 'none');
      hitArea.setAttribute('pointer-events', 'stroke');
      content.appendChild(hitArea);
      e.preventDefault();
    } else if (state.tool === 'text') {
      // Check if clicking on existing text to continue typing
      const elementUnderMouse = document.elementFromPoint(e.clientX, e.clientY);
      if (elementUnderMouse && elementUnderMouse.classList.contains('va-text-element')) {
        // Handle double-click for text selection using timer
        clickCount++;
        
        if (clickCount === 1) {
          // First click - start timer
          clickTimeout = setTimeout(() => {
            // Single-click: continue typing at the clicked position in existing text
            continueText(elementUnderMouse, e.clientX, e.clientY);
            clickCount = 0;
          }, 300); // 300ms delay to detect double-click
        } else if (clickCount === 2) {
          // Double-click: select the text element
          clearTimeout(clickTimeout);
          console.log('Double-click detected on text element');
          selectElement(elementUnderMouse);
          clickCount = 0;
        }
        
        e.preventDefault();
        return;
      }
      
      // Don't create new text if clicking on drawings (hit areas)
      if (elementUnderMouse && elementUnderMouse.classList.contains('va-path-hit-area')) {
        e.preventDefault();
        return;
      }
      
      // Create new text if not clicking on existing text
      const p = svgPoint(e);
      beginText(p.x, p.y);
      e.preventDefault();
    }
  };

  const onMove = (e) => {
    if (state.tool !== 'pen' || !drawing || e.pointerId !== pid) return;
    const p = svgPoint(e);
    const last = points[points.length - 1];
    if (!last || dist2(p, last) >= MIN_D2) {
      points.push(p);
      const pathData = pathFrom(points);
      pathEl.setAttribute('d', pathData);
      // Update hit area with the same path data
      if (hitArea) {
        hitArea.setAttribute('d', pathData);
      }
    }
    
    // Update pen cursor position during drawing
    if (penCursor) {
      penCursor.style.left = e.clientX + 'px';
      penCursor.style.top = e.clientY + 'px';
    }
    
    e.preventDefault();
  };

  const endStroke = () => {
    if (!drawing) return;
    drawing = false;
    if (pathEl) {
      if (points.length < 2) {
        const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        dot.setAttribute('cx', points[0].x);
        dot.setAttribute('cy', points[0].y);
        dot.setAttribute('r', Math.max(1, state.width / 2));
        dot.setAttribute('fill', state.color);
        dot.setAttribute('class', 'va-path-element');
        pathEl.remove();
        if (hitArea) hitArea.remove();
        content.appendChild(dot);
        pushAdd(dot);
      } else {
        // Link the hit area to the path element for selection
        if (hitArea) {
          hitArea.setAttribute('data-linked-path', 'true');
        }
        pushAdd(pathEl);
      }
    }
    pathEl = null;
    hitArea = null;
    points = [];
    pid = null;
  };

  // Event listeners
  svg.addEventListener('pointerdown', onDown);
  svg.addEventListener('pointermove', onMove);
  svg.addEventListener('pointerup', endStroke);
  svg.addEventListener('pointercancel', endStroke);

  // Toolbar event listeners
  document.querySelectorAll('[data-tool]').forEach(btn => {
    btn.addEventListener('click', () => setTool(btn.dataset.tool));
  });

  document.getElementById('va-undo').addEventListener('click', undo);
  document.getElementById('va-clear').addEventListener('click', () => {
    [...content.childNodes].forEach(n => n.remove());
    state.history.length = 0;
    state.redo.length = 0;
  });

  // Color, width, font inputs
  const colorInput = toolbar.querySelector('input[type="color"]');
  const widthInput = toolbar.querySelector('input[type="range"]');
  const fontInput = toolbar.querySelector('input[type="number"]');

  colorInput.addEventListener('input', () => {
    state.color = colorInput.value;
    updateCaretColor();
  });

  widthInput.addEventListener('input', () => {
    state.width = parseFloat(widthInput.value);
  });

  fontInput.addEventListener('input', () => {
    state.fontSize = parseFloat(fontInput.value);
    positionCaret();
  });

  // Print functionality
  const saveBtn = document.getElementById('va-save');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      // Trigger the browser's print dialog
      window.print();
    });
  }

  // Selection and deletion functionality
  let selectedElement = null;
  
  const selectElement = (element) => {
    // Remove previous selection
    if (selectedElement) {
      selectedElement.classList.remove('va-selected');
      // Remove selection frame if it exists
      const existingFrame = document.querySelector('.va-selection-frame');
      if (existingFrame) {
        existingFrame.remove();
      }
      // Remove delete button if it exists
      const existingDeleteBtn = document.querySelector('.va-delete-btn');
      if (existingDeleteBtn) {
        existingDeleteBtn.remove();
      }
    }
    
    // If selecting a hit area, find the corresponding path element
    let targetElement = element;
    if (element.classList.contains('va-path-hit-area')) {
      // Find the corresponding path element by looking for the path that was created just before this hit area
      const allElements = Array.from(content.children);
      const hitAreaIndex = allElements.indexOf(element);
      // Look for the path element just before this hit area
      for (let i = hitAreaIndex - 1; i >= 0; i--) {
        if (allElements[i].classList.contains('va-path-element') && allElements[i].tagName === 'path') {
          targetElement = allElements[i];
          break;
        }
      }
    }
    
    // Add selection to new element
    selectedElement = targetElement;
    if (selectedElement) {
      selectedElement.classList.add('va-selected');
      
      // Create frame for text and drawing elements
      if (selectedElement.tagName === 'text' || selectedElement.tagName === 'path' || selectedElement.tagName === 'circle') {
        // Use setTimeout to ensure the element is rendered before getting bbox
        setTimeout(() => {
          try {
            const bbox = selectedElement.getBBox();
            const frame = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            frame.setAttribute('class', 'va-selection-frame');
            frame.setAttribute('x', bbox.x - 3);
            frame.setAttribute('y', bbox.y - 3);
            frame.setAttribute('width', bbox.width + 6);
            frame.setAttribute('height', bbox.height + 6);
            frame.setAttribute('fill', 'none');
            frame.setAttribute('stroke', '#1e3a8a');
            frame.setAttribute('stroke-width', '2');
            frame.setAttribute('stroke-dasharray', '5,5');
            frame.setAttribute('rx', '2');
            frame.setAttribute('ry', '2');
            ui.appendChild(frame);
            
            // Add X button for deletion
            const deleteBtn = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            deleteBtn.setAttribute('class', 'va-delete-btn');
            deleteBtn.setAttribute('transform', `translate(${bbox.x + bbox.width - 5}, ${bbox.y - 5})`);
            deleteBtn.setAttribute('style', 'cursor: pointer; pointer-events: all;');
            
            const deleteCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            deleteCircle.setAttribute('cx', '0');
            deleteCircle.setAttribute('cy', '0');
            deleteCircle.setAttribute('r', '8');
            deleteCircle.setAttribute('fill', '#8B0000');
            deleteCircle.setAttribute('stroke', '#fff');
            deleteCircle.setAttribute('stroke-width', '1');
            deleteCircle.setAttribute('style', 'pointer-events: all;');
            
            const deleteX = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            deleteX.setAttribute('x', '0');
            deleteX.setAttribute('y', '0');
            deleteX.setAttribute('text-anchor', 'middle');
            deleteX.setAttribute('dominant-baseline', 'central');
            deleteX.setAttribute('fill', '#fff');
            deleteX.setAttribute('font-size', '10');
            deleteX.setAttribute('font-weight', 'bold');
            deleteX.setAttribute('style', 'pointer-events: all;');
            deleteX.textContent = '×';
            
            deleteBtn.appendChild(deleteCircle);
            deleteBtn.appendChild(deleteX);
            ui.appendChild(deleteBtn);
            
            console.log('Frame and delete button created:', bbox);
          } catch (e) {
            console.log('Error creating frame:', e);
          }
        }, 10);
      }
    }
  };
  
  const deleteSelected = () => {
    if (selectedElement) {
      selectedElement.remove();
      // Remove selection frame if it exists
      const existingFrame = document.querySelector('.va-selection-frame');
      if (existingFrame) {
        existingFrame.remove();
      }
      // Remove delete button if it exists
      const existingDeleteBtn = document.querySelector('.va-delete-btn');
      if (existingDeleteBtn) {
        existingDeleteBtn.remove();
      }
      selectedElement = null;
    }
  };
  
  // Handle selection for both HTML and SVG elements when pass-through is active
  document.addEventListener('click', (e) => {
    // Check if clicking on delete button (check both the button itself and its children)
    // This should work regardless of which tool is active
    const elementUnderMouse = document.elementFromPoint(e.clientX, e.clientY);
    if (elementUnderMouse && (elementUnderMouse.classList.contains('va-delete-btn') || elementUnderMouse.closest('.va-delete-btn'))) {
      // Delete button clicked
      console.log('Delete button clicked');
      deleteSelected();
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    
    // Only allow selection when pass-through tool is explicitly active
    if (state.passThrough) {
      // Temporarily enable pointer events to detect SVG elements
      overlay.style.pointerEvents = 'auto';
      const elementUnderMouse = document.elementFromPoint(e.clientX, e.clientY);
      overlay.style.pointerEvents = 'none';
      
      // Check if clicking on existing SVG elements (your created content)
      if (elementUnderMouse && elementUnderMouse.closest('#va-root-overlay')) {
        // Select if it's a valid element (including hit areas)
        if (elementUnderMouse.classList.contains('va-text-element') || 
            elementUnderMouse.classList.contains('va-path-element') || 
            elementUnderMouse.classList.contains('va-path-hit-area') ||
            elementUnderMouse.tagName === 'circle') {
          // Selecting existing SVG element
          selectElement(elementUnderMouse);
          e.preventDefault();
          e.stopPropagation();
          return;
        }
      }
      
      // Check if clicking on HTML text elements (not SVG or toolbar)
      if (e.target.tagName && !e.target.closest('#va-root-toolbar') && !e.target.closest('#va-root-overlay')) {
        // Allow regular browser text selection for HTML text elements
        if (e.target.tagName === 'P' || e.target.tagName === 'H1' || e.target.tagName === 'H2' || 
            e.target.tagName === 'H3' || e.target.tagName === 'H4' || e.target.tagName === 'H5' || 
            e.target.tagName === 'H6' || e.target.tagName === 'SPAN' || e.target.tagName === 'DIV' ||
            e.target.tagName === 'LI' || e.target.tagName === 'A' || e.target.tagName === 'STRONG' ||
            e.target.tagName === 'EM' || e.target.tagName === 'B' || e.target.tagName === 'I' ||
            e.target.tagName === 'BLOCKQUOTE' || e.target.tagName === 'SECTION' || e.target.tagName === 'ARTICLE') {
          // Don't prevent default - allow normal text selection for HTML content
          // Don't stop propagation - allow normal click behavior
        }
      }
    }
  });
  
  // Mouse move to update custom cursor position
  document.addEventListener('mousemove', updateCustomCursor);

  // Keyboard shortcuts
  window.addEventListener('keydown', (e) => {
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
    if (e.metaKey || e.ctrlKey) {
      if (e.key.toLowerCase() === 'z' && !e.shiftKey) {
        undo();
        e.preventDefault();
      }
    }
    if (e.key === 'Delete' || e.key === 'Backspace') {
      deleteSelected();
      e.preventDefault();
    }
  });

  // Initialize with select tool active
  setTool('passthru');

  console.log('VectorAnnotator initialized successfully');
});
