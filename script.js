// Global variables for cyborg transformation
let originalImage = null;
let canvas = null;
let ctx = null;
let currentHandle = '';
let currentEffects = {
    eyeGlow: 50,
    metallic: 60,
    circuits: 40,
    neonGlow: 45,
    mechanical: 30
};

// Image sources to try for Aelina's portrait
const aelinaImageSources = [
    'aelina.jpg',
    'aelina.jpeg', 
    'aelina.png',
    './aelina.jpg',
    './aelina.jpeg',
    './aelina.png',
    'images/aelina.jpg',
    'images/aelina.jpeg',
    'images/aelina.png',
    // Base64 encoded cyborg image as final fallback
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9ImN5Ym9yZ0dyYWRpZW50IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KPHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzAwODBGRjtzdG9wLW9wYWNpdHk6MSIgLz4KPHN0b3Agb2Zmc2V0PSI1MCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNGRjgwMDA7c3RvcC1vcGFjaXR5OjEiIC8+CjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6IzgwMDA4MDtzdG9wLW9wYWNpdHk6MSIgLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0idXJsKCNjeWJvcmdHcmFkaWVudCkiLz4KPGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSI4MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDBGRkZGIiBzdHJva2Utd2lkdGg9IjMiIG9wYWNpdHk9IjAuOCIvPgo8Y2lyY2xlIGN4PSI3MCIgY3k9IjgwIiByPSI4IiBmaWxsPSIjMDBGRkZGIiBvcGFjaXR5PSIwLjkiPgo8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiB2YWx1ZXM9IjAuMzsxOzAuMyIgZHVyPSIycy4gcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KPC9jaXJjbGU+CjxjaXJjbGUgY3g9IjEzMCIgY3k9IjgwIiByPSI4IiBmaWxsPSIjMDBGRkZGIiBvcGFjaXR5PSIwLjkiPgo8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiB2YWx1ZXM9IjE7MC4zOzEiIGR1cj0iMnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CjwvY2lyY2xlPgo8dGV4dCB4PSIxMDAiIHk9IjE0MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmaWxsPSIjRkZGRkZGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXdlaWdodD0iYm9sZCI+QUVMSU5BPC90ZXh0Pgo8dGV4dCB4PSIxMDAiIHk9IjE2MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSIjRkZGRkZGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5DWUJPUSBBSSBJPC90ZXh0PjxyZWN0IHg9IjQwIiB5PSIzMCIgd2lkdGg9IjQiIGhlaWdodD0iMjAiIGZpbGw9IiMwMEZGRkYiIG9wYWNpdHk9IjAuNyIvPgo8cmVjdCB4PSI1MCIgeT0iNDAiIHdpZHRoPSI2IiBoZWlnaHQ9IjE1IiBmaWxsPSIjRkY4MDAwIiBvcGFjaXR5PSIwLjciLz4KPHJlY3QgeD0iMTQ1IiB5PSIzNSIgd2lkdGg9IjUiIGhlaWdodD0iMTgiIGZpbGw9IiM4MDAwODAiIG9wYWNpdHk9IjAuNyIvPgo8L3N2Zz4='
];
let currentImageIndex = 0;

// Function to try next image source
function tryNextImageSource(img) {
    currentImageIndex++;
    
    if (currentImageIndex < aelinaImageSources.length) {
        console.log(`🔄 Trying image source ${currentImageIndex}: ${aelinaImageSources[currentImageIndex].substring(0, 50)}...`);
        img.src = aelinaImageSources[currentImageIndex];
    } else {
        console.log('❌ All image sources failed, showing placeholder');
        showAelinaPlaceholder();
    }
}

// Show Aelina placeholder when image fails
function showAelinaPlaceholder() {
    const img = document.getElementById('aelina-portrait-img');
    const placeholder = document.getElementById('portrait-placeholder');
    
    if (img && placeholder) {
        img.style.display = 'none';
        placeholder.style.display = 'flex';
        console.log('🎨 Aelina placeholder displayed - This is actually pretty cool!');
    }
}

// Initialize Aelina portrait on page load
function initializeAelinaPortrait() {
    const img = document.getElementById('aelina-portrait-img');
    const placeholder = document.getElementById('portrait-placeholder');
    
    console.log('🚀 Initializing Aelina portrait...');
    
    if (img && placeholder) {
        // Start with placeholder visible as backup
        placeholder.style.display = 'flex';
        img.style.display = 'none';
        
        // Test if first image loads
        img.onerror = function() {
            console.log(`❌ Failed to load: ${this.src}`);
            this.onerror = null;
            tryNextImageSource(this);
        };
        
        img.onload = function() {
            console.log('✅ Aelina portrait loaded successfully!');
            placeholder.style.display = 'none';
            this.style.display = 'block';
        };
        
        // Start loading immediately with base64 fallback
        console.log(`📸 Loading fallback image immediately...`);
        img.src = aelinaImageSources[aelinaImageSources.length - 1]; // Use the base64 SVG
        
        // Then try to load the actual image file after a delay
        setTimeout(() => {
            console.log(`📸 Now trying to load: ${aelinaImageSources[0]}`);
            currentImageIndex = 0;
            img.src = aelinaImageSources[0];
        }, 1000);
        
    } else {
        console.log('❌ Could not find image or placeholder elements');
    }
}

// Manual function to force show image (can be called from console)
function forceShowAelinaImage() {
    const img = document.getElementById('aelina-portrait-img');
    const placeholder = document.getElementById('portrait-placeholder');
    
    if (img && placeholder) {
        console.log('🔧 Manually forcing Aelina image display...');
        placeholder.style.display = 'none';
        img.style.display = 'block';
        img.src = aelinaImageSources[aelinaImageSources.length - 1]; // Base64 SVG
        console.log('✅ Forced display complete!');
    }
}

// Toggle portrait size between normal and large
function togglePortraitSize() {
    const portraitDiv = document.querySelector('.aelina-portrait');
    if (portraitDiv) {
        portraitDiv.classList.toggle('large-portrait');
        console.log('Portrait size toggled:', portraitDiv.classList.contains('large-portrait') ? 'Large' : 'Normal');
    }
}

// Set portrait to large by default (comment out this line if you want normal size)
function setLargePortraitDefault() {
    const portraitDiv = document.querySelector('.aelina-portrait');
    if (portraitDiv) {
        portraitDiv.classList.add('large-portrait');
        console.log('Portrait set to large size by default');
    }
}

// Mock Twitter profile data for demonstration
const mockProfiles = {
    'elonmusk': {
        handle: '@elonmusk',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
    },
    'sama': {
        handle: '@sama', 
        imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
    },
    'karpathy': {
        handle: '@karpathy',
        imageUrl: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=400&fit=crop&crop=face'
    },
    'jack': {
        handle: '@jack',
        imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face'
    }
};

// Fallback images that will definitely work
const fallbackImages = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face',
    // Base64 encoded simple avatar as final fallback
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJhdmF0YXJHcmFkaWVudCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzRBOTBFMjtzdG9wLW9wYWNpdHk6MSIgLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM3QjY4RUU7c3RvcC1vcGFjaXR5OjEiIC8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9InVybCgjYXZhdGFyR3JhZGllbnQpIi8+PGNpcmNsZSBjeD0iMjAwIiBjeT0iMTUwIiByPSI4MCIgZmlsbD0iI0ZGRkZGRiIgb3BhY2l0eT0iMC4xIi8+PGNpcmNsZSBjeD0iMTcwIiBjeT0iMTMwIiByPSI4IiBmaWxsPSIjRkZGRkZGIiBvcGFjaXR5PSIwLjgiLz48Y2lyY2xlIGN4PSIyMzAiIGN5PSIxMzAiIHI9IjgiIGZpbGw9IiNGRkZGRkYiIG9wYWNpdHk9IjAuOCIvPjxlbGxpcHNlIGN4PSIyMDAiIGN5PSIxNzAiIHI9IjE1IiByeT0iMTAiIGZpbGw9IiNGRkZGRkYiIG9wYWNpdHk9IjAuNiIvPjx0ZXh0IHg9IjIwMCIgeT0iMzQwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiNGRkZGRkYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtd2VpZ2h0PSJib2xkIiBvcGFjaXR5PSIwLjgiPlBST0ZJTEU8L3RleHQ+PHRleHQgeD0iMjAwIiB5PSIzNjUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiIgZmlsbD0iI0ZGRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgb3BhY2l0eT0iMC42Ij5QSUNDVFVSRTwvdGV4dD48L3N2Zz4='
];

// Comprehensive system check (can be called from console)
function systemCheck() {
    console.log('🔍 Running comprehensive system check...');
    showStatusMessage('🔍 Running system diagnostics...');
    
    const issues = [];
    
    // Check HTML elements
    const requiredElements = [
        'twitter-handle',
        'transform-btn',
        'cyborg-canvas', 
        'original-image',
        'current-handle',
        'transformation-section',
        'error-section',
        'status-messages'
    ];
    
    requiredElements.forEach(id => {
        const element = document.getElementById(id);
        if (!element) {
            issues.push(`❌ Missing element: ${id}`);
        } else {
            console.log(`✅ Found element: ${id}`);
        }
    });
    
    // Check Canvas
    if (!canvas) {
        issues.push('❌ Canvas not initialized');
        initializeCanvas();
    } else {
        console.log(`✅ Canvas: ${canvas.width}x${canvas.height}`);
    }
    
    if (!ctx) {
        issues.push('❌ Canvas context not available');
    } else {
        console.log('✅ Canvas context available');
    }
    
    // Check sliders
    const effects = ['eyeGlow', 'metallic', 'circuits', 'neonGlow', 'mechanical'];
    effects.forEach(effect => {
        const slider = document.getElementById(effect);
        const valueDisplay = document.getElementById(`${effect}-value`);
        if (!slider) issues.push(`❌ Missing slider: ${effect}`);
        if (!valueDisplay) issues.push(`❌ Missing value display: ${effect}-value`);
    });
    
    // Report results
    if (issues.length === 0) {
        console.log('🎉 All systems operational!');
        showStatusMessage('✅ All systems operational! Ready for cyborg transformation! 🤖');
        setTimeout(() => hideStatusMessage(), 3000);
        return true;
    } else {
        console.log('⚠️ Issues found:');
        issues.forEach(issue => console.log(issue));
        showStatusMessage(`⚠️ Found ${issues.length} issues - check console for details`);
        setTimeout(() => hideStatusMessage(), 5000);
        return false;
    }
}

// Auto-run system check on page load
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    initializeCanvas();
    startClock();
    initializeAelinaPortrait(); // Initialize Aelina portrait
    setLargePortraitDefault(); // Set to large size by default for better visibility
    
    // Run system check after a brief delay
    setTimeout(() => {
        systemCheck();
    }, 2000);
});

// Update clock
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    document.getElementById('current-time').textContent = timeString;
}

// Start clock
function startClock() {
    updateClock();
    setInterval(updateClock, 1000);
}

// Set up event listeners
function setupEventListeners() {
    // Twitter handle input
    const handleInput = document.getElementById('twitter-handle');
    handleInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            fetchAndTransform();
        }
    });

    // Effect sliders
    const effects = ['eyeGlow', 'metallic', 'circuits', 'neonGlow', 'mechanical'];
    effects.forEach(effect => {
        const slider = document.getElementById(effect);
        if (slider) {
            slider.addEventListener('input', function() {
                updateEffect(effect, this.value);
            });
        }
    });
}

// Initialize canvas
function initializeCanvas() {
    canvas = document.getElementById('cyborg-canvas');
    if (canvas) {
        ctx = canvas.getContext('2d');
        canvas.width = 200;
        canvas.height = 200;
    }
}

// Fill handle from example
function fillHandle(handle) {
    document.getElementById('twitter-handle').value = handle;
}

// Status message functions
function showStatusMessage(message) {
    const statusMessages = document.getElementById('status-messages');
    const statusText = document.getElementById('status-text');
    
    if (statusMessages && statusText) {
        statusText.textContent = message;
        statusMessages.style.display = 'block';
        console.log('📢 Status:', message);
    }
}

function hideStatusMessage() {
    const statusMessages = document.getElementById('status-messages');
    if (statusMessages) {
        statusMessages.style.display = 'none';
    }
}

// Main function to fetch profile image and start transformation
async function fetchAndTransform() {
    const handleInput = document.getElementById('twitter-handle');
    const transformBtn = document.getElementById('transform-btn');
    const btnText = transformBtn.querySelector('.btn-text');
    const loadingSpinner = transformBtn.querySelector('.loading-spinner');
    
    let handle = handleInput.value.trim();
    
    if (!handle) {
        showError('ERROR 404: USERNAME NOT FOUND! Please enter a valid Twitter handle to proceed with cyborg transformation protocol! 🤖');
        return;
    }
    
    // Clean handle
    handle = handle.replace('@', '').toLowerCase();
    currentHandle = handle;
    
    // Show status messages
    showStatusMessage(`🔍 Searching for ${handle}'s profile...`);
    
    // Show loading state
    btnText.style.display = 'none';
    loadingSpinner.style.display = 'inline';
    transformBtn.disabled = true;
    
    // Hide previous sections
    document.getElementById('transformation-section').style.display = 'none';
    document.getElementById('error-section').style.display = 'none';
    
    try {
        // Update status
        showStatusMessage(`📸 Downloading ${handle}'s profile image...`);
        
        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Get profile data
        const profileData = mockProfiles[handle] || generateMockProfile(handle);
        
        // Update status
        showStatusMessage(`⚙️ Initializing cyborg transformation for ${handle}...`);
        
        // Load and display profile image
        await loadProfileImage(profileData);
        
        // Update status
        showStatusMessage(`✅ Cyborg transformation complete! Welcome to the future, ${handle}! 🤖`);
        
        // Hide status after 3 seconds
        setTimeout(() => {
            hideStatusMessage();
        }, 3000);
        
    } catch (error) {
        showError('SYSTEM ERROR: Cyborg transformation protocol encountered an unexpected error. Please restart the cyborgification process! 💾');
        hideStatusMessage();
    } finally {
        // Reset button state
        btnText.style.display = 'inline';
        loadingSpinner.style.display = 'none';
        transformBtn.disabled = false;
    }
}

// Generate mock profile for unknown handles
function generateMockProfile(handle) {
    // Use a random fallback image for unknown handles
    const randomImage = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
    return {
        handle: `@${handle}`,
        imageUrl: randomImage
    };
}

// Load profile image and start transformation
async function loadProfileImage(profileData) {
    console.log('🖼️ Starting image load for:', profileData.handle);
    
    return new Promise((resolve, reject) => {
        let imageIndex = 0;
        
        function tryLoadImage() {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            
            // If we've tried the original URL, try fallbacks
            const imageUrl = imageIndex === 0 ? profileData.imageUrl : fallbackImages[imageIndex - 1];
            
            img.onload = function() {
                console.log('✅ Image loaded successfully:', imageUrl.substring(0, 50) + '...');
                originalImage = img;
                displayProfileImages({...profileData, imageUrl: imageUrl});
                applyInitialTransformation();
                showTransformationSection();
                resolve();
            };
            
            img.onerror = function() {
                console.log('❌ Failed to load image:', imageUrl.substring(0, 50) + '...');
                imageIndex++;
                
                if (imageIndex < fallbackImages.length + 1) {
                    console.log('🔄 Trying fallback image', imageIndex);
                    tryLoadImage();
                } else {
                    console.log('⚠️ All images failed, using canvas-generated fallback');
                    // Create a simple colored rectangle as final fallback
                    createFallbackCanvas(profileData);
                    resolve();
                }
            };
            
            console.log('📸 Attempting to load:', imageUrl.substring(0, 50) + '...');
            img.src = imageUrl;
        }
        
        tryLoadImage();
    });
}

// Create a canvas-generated fallback image
function createFallbackCanvas(profileData) {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = 400;
    tempCanvas.height = 400;
    const tempCtx = tempCanvas.getContext('2d');
    
    // Create a gradient background
    const gradient = tempCtx.createLinearGradient(0, 0, 400, 400);
    gradient.addColorStop(0, '#4A90E2');
    gradient.addColorStop(1, '#7B68EE');
    
    tempCtx.fillStyle = gradient;
    tempCtx.fillRect(0, 0, 400, 400);
    
    // Add some simple face-like elements
    tempCtx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    tempCtx.beginPath();
    tempCtx.arc(200, 180, 120, 0, 2 * Math.PI);
    tempCtx.fill();
    
    // Eyes
    tempCtx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    tempCtx.beginPath();
    tempCtx.arc(170, 160, 12, 0, 2 * Math.PI);
    tempCtx.fill();
    tempCtx.beginPath();
    tempCtx.arc(230, 160, 12, 0, 2 * Math.PI);
    tempCtx.fill();
    
    // Add text
    tempCtx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    tempCtx.font = 'bold 32px Arial';
    tempCtx.textAlign = 'center';
    tempCtx.fillText(profileData.handle, 200, 320);
    
    // Convert canvas to image and use it
    tempCanvas.toBlob(function(blob) {
        const url = URL.createObjectURL(blob);
        const img = new Image();
        img.onload = function() {
            originalImage = img;
            displayProfileImages({...profileData, imageUrl: url});
            applyInitialTransformation();
            showTransformationSection();
            URL.revokeObjectURL(url);
        };
        img.src = url;
    });
}

// Display original and cyborg images
function displayProfileImages(profileData) {
    console.log('🎨 Displaying profile images for:', profileData.handle);
    
    // Display original image
    const originalImg = document.getElementById('original-image');
    if (originalImg) {
        originalImg.src = originalImage.src;
        originalImg.width = 200;
        originalImg.height = 200;
        console.log('✅ Original image displayed');
    }
    
    // Update current handle display
    const handleElement = document.getElementById('current-handle');
    if (handleElement) {
        handleElement.textContent = profileData.handle;
    }
    
    // Initialize canvas for cyborg transformation
    if (canvas && ctx && originalImage) {
        // Set canvas size
        canvas.width = 200;
        canvas.height = 200;
        
        // Calculate proper scaling to fit image in canvas
        const aspectRatio = originalImage.width / originalImage.height;
        let drawWidth = 200;
        let drawHeight = 200;
        let offsetX = 0;
        let offsetY = 0;
        
        if (aspectRatio > 1) {
            // Landscape image
            drawHeight = drawWidth / aspectRatio;
            offsetY = (200 - drawHeight) / 2;
        } else if (aspectRatio < 1) {
            // Portrait image
            drawWidth = drawHeight * aspectRatio;
            offsetX = (200 - drawWidth) / 2;
        }
        
        // Clear canvas and draw image
        ctx.clearRect(0, 0, 200, 200);
        ctx.drawImage(originalImage, offsetX, offsetY, drawWidth, drawHeight);
        
        console.log('✅ Canvas initialized and image drawn');
    } else {
        console.log('❌ Canvas or image not available for drawing');
    }
}

// Apply initial cyborg transformation with default values
function applyInitialTransformation() {
    console.log('⚙️ Applying initial cyborg transformation...');
    
    // Reset effects to default values
    currentEffects = {
        eyeGlow: 50,
        metallic: 60,
        circuits: 40,
        neonGlow: 45,
        mechanical: 30
    };
    
    // Update sliders to match
    Object.keys(currentEffects).forEach(effect => {
        const slider = document.getElementById(effect);
        const valueDisplay = document.getElementById(`${effect}-value`);
        if (slider && valueDisplay) {
            slider.value = currentEffects[effect];
            valueDisplay.textContent = `${currentEffects[effect]}%`;
        }
    });
    
    // Apply transformation
    applyCyborgEffects();
    console.log('✅ Initial transformation applied!');
}

// Test function to manually trigger transformation (can be called from console)
function testTransformation() {
    console.log('🧪 Testing cyborg transformation manually...');
    showStatusMessage('🧪 Running cyborg transformation test...');
    
    if (!canvas || !ctx) {
        console.log('❌ Canvas not initialized');
        showStatusMessage('⚠️ Initializing canvas...');
        initializeCanvas();
    }
    
    if (!originalImage) {
        console.log('⚠️ No original image found, creating test image...');
        showStatusMessage('🎨 Creating test image...');
        
        // Create a test image
        const testCanvas = document.createElement('canvas');
        testCanvas.width = 200;
        testCanvas.height = 200;
        const testCtx = testCanvas.getContext('2d');
        
        // Draw a simple test pattern
        const gradient = testCtx.createLinearGradient(0, 0, 200, 200);
        gradient.addColorStop(0, '#ff6b6b');
        gradient.addColorStop(1, '#4ecdc4');
        testCtx.fillStyle = gradient;
        testCtx.fillRect(0, 0, 200, 200);
        
        // Add a face-like pattern
        testCtx.fillStyle = '#333';
        testCtx.fillRect(60, 60, 20, 20); // Left eye
        testCtx.fillRect(120, 60, 20, 20); // Right eye
        testCtx.fillRect(90, 120, 20, 10); // Mouth
        
        testCanvas.toBlob(function(blob) {
            const url = URL.createObjectURL(blob);
            const img = new Image();
            img.onload = function() {
                originalImage = img;
                currentHandle = '@test';
                displayProfileImages({handle: '@test', imageUrl: url});
                showStatusMessage('⚙️ Applying cyborg effects...');
                applyInitialTransformation();
                showTransformationSection();
                showStatusMessage('✅ Test transformation complete! 🧪');
                setTimeout(() => hideStatusMessage(), 3000);
                URL.revokeObjectURL(url);
                console.log('✅ Test transformation complete!');
            };
            img.src = url;
        });
        return;
    }
    
    // Test with existing image
    if (canvas && ctx && originalImage) {
        showStatusMessage('⚙️ Applying cyborg effects to existing image...');
        ctx.clearRect(0, 0, 200, 200);
        ctx.drawImage(originalImage, 0, 0, 200, 200);
        applyInitialTransformation();
        showTransformationSection();
        showStatusMessage('✅ Test transformation complete! 🧪');
        setTimeout(() => hideStatusMessage(), 3000);
        console.log('✅ Test transformation with existing image complete!');
    }
}

// Quick demo function (can be called from console)
function quickDemo() {
    console.log('🚀 Starting quick demo...');
    showStatusMessage('🚀 Starting quick demo with @elonmusk...');
    document.getElementById('twitter-handle').value = '@elonmusk';
    fetchAndTransform();
}

// Show transformation section
function showTransformationSection() {
    document.getElementById('transformation-section').style.display = 'block';
    document.getElementById('error-section').style.display = 'none';
    
    // Scroll to transformation section
    document.getElementById('transformation-section').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// Update effect value and apply transformation
function updateEffect(effectName, value) {
    const valueDisplay = document.getElementById(`${effectName}-value`);
    if (valueDisplay) {
        valueDisplay.textContent = `${value}%`;
    }
    
    currentEffects[effectName] = parseInt(value);
    applyCyborgEffects();
}

// Apply all cyborg effects to the image
function applyCyborgEffects() {
    if (!originalImage || !canvas || !ctx) return;
    
    // Clear canvas and redraw original
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);
    
    // Get image data for pixel manipulation
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    // Apply pixel-level effects
    applyMetallicEffect(data, currentEffects.metallic);
    applyEyeGlowEffect(data, currentEffects.eyeGlow);
    applyNeonGlowEffect(data, currentEffects.neonGlow);
    
    // Put modified image data back
    ctx.putImageData(imageData, 0, 0);
    
    // Apply CSS filter effects
    applyCSSFilters();
    
    // Draw overlay effects
    if (currentEffects.circuits > 0) {
        drawCircuitOverlay();
    }
    
    if (currentEffects.mechanical > 0) {
        drawMechanicalOverlay();
    }
}

// Apply metallic skin effect
function applyMetallicEffect(data, intensity) {
    if (intensity === 0) return;
    
    const factor = intensity / 100;
    
    for (let i = 0; i < data.length; i += 4) {
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];
        
        // Convert to metallic tones
        const gray = (r + g + b) / 3;
        const metallic = gray + (factor * 40);
        
        data[i] = Math.min(255, metallic + (factor * 30));     // Red
        data[i + 1] = Math.min(255, metallic + (factor * 35)); // Green  
        data[i + 2] = Math.min(255, metallic + (factor * 50)); // Blue
    }
}

// Apply glowing eye effect
function applyEyeGlowEffect(data, intensity) {
    if (intensity === 0) return;
    
    const factor = intensity / 100;
    
    for (let i = 0; i < data.length; i += 4) {
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];
        
        // Enhance bright areas (likely eyes)
        const brightness = (r + g + b) / 3;
        if (brightness > 140) {
            data[i] = Math.min(255, r + (factor * 120));     // More red
            data[i + 1] = Math.min(255, g + (factor * 60));  // Some green
            data[i + 2] = Math.min(255, b + (factor * 180)); // More blue
        }
    }
}

// Apply neon glow effect
function applyNeonGlowEffect(data, intensity) {
    if (intensity === 0) return;
    
    const factor = intensity / 100;
    
    for (let i = 0; i < data.length; i += 4) {
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];
        
        // Add neon colors to mid-tone areas
        const avg = (r + g + b) / 3;
        if (avg > 80 && avg < 180) {
            data[i] = Math.min(255, r + (factor * 70));     // Red
            data[i + 1] = Math.min(255, g + (factor * 100)); // Green
            data[i + 2] = Math.min(255, b + (factor * 150)); // Blue
        }
    }
}

// Apply CSS filters for additional effects
function applyCSSFilters() {
    let filters = [];
    
    if (currentEffects.metallic > 0) {
        filters.push(`contrast(${100 + currentEffects.metallic * 0.8}%)`);
        filters.push(`saturate(${80 + currentEffects.metallic * 0.6}%)`);
    }
    
    if (currentEffects.neonGlow > 0) {
        filters.push(`brightness(${100 + currentEffects.neonGlow * 0.4}%)`);
        filters.push(`hue-rotate(${currentEffects.neonGlow * 2}deg)`);
    }
    
    if (currentEffects.eyeGlow > 0) {
        filters.push(`drop-shadow(0 0 ${currentEffects.eyeGlow * 0.3}px rgba(64, 224, 255, 0.8))`);
    }
    
    if (canvas) {
        canvas.style.filter = filters.join(' ');
    }
}

// Draw circuit overlay
function drawCircuitOverlay() {
    if (!ctx) return;
    
    const intensity = currentEffects.circuits / 100;
    
    ctx.strokeStyle = `rgba(0, 255, 255, ${intensity * 0.9})`;
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';
    
    const numLines = Math.floor(intensity * 12);
    
    for (let i = 0; i < numLines; i++) {
        ctx.beginPath();
        
        const startX = Math.random() * canvas.width;
        const startY = Math.random() * canvas.height;
        const length = 15 + Math.random() * 30;
        const angle = Math.random() * Math.PI * 2;
        
        const endX = startX + Math.cos(angle) * length;
        const endY = startY + Math.sin(angle) * length;
        
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        
        // Add circuit nodes
        ctx.arc(startX, startY, 1, 0, 2 * Math.PI);
        ctx.arc(endX, endY, 1, 0, 2 * Math.PI);
        
        ctx.stroke();
    }
}

// Draw mechanical overlay
function drawMechanicalOverlay() {
    if (!ctx) return;
    
    const intensity = currentEffects.mechanical / 100;
    
    ctx.fillStyle = `rgba(150, 150, 150, ${intensity * 0.7})`;
    ctx.strokeStyle = `rgba(100, 100, 100, ${intensity * 0.9})`;
    ctx.lineWidth = 1;
    
    const numParts = Math.floor(intensity * 8);
    
    for (let i = 0; i < numParts; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = 6 + Math.random() * 12;
        
        if (Math.random() > 0.5) {
            // Rectangle
            ctx.fillRect(x - size/2, y - size/2, size, size);
            ctx.strokeRect(x - size/2, y - size/2, size, size);
            
            // Add internal lines
            ctx.beginPath();
            ctx.moveTo(x - size/4, y - size/2);
            ctx.lineTo(x - size/4, y + size/2);
            ctx.moveTo(x + size/4, y - size/2);
            ctx.lineTo(x + size/4, y + size/2);
            ctx.stroke();
        } else {
            // Circle
            ctx.beginPath();
            ctx.arc(x, y, size/2, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
            
            // Add center dot
            ctx.beginPath();
            ctx.arc(x, y, size/6, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
}

// Apply preset transformations
function applyPreset(presetName) {
    const presets = {
        subtle: { eyeGlow: 30, metallic: 25, circuits: 20, neonGlow: 15, mechanical: 10 },
        intense: { eyeGlow: 85, metallic: 90, circuits: 70, neonGlow: 80, mechanical: 60 },
        terminator: { eyeGlow: 100, metallic: 95, circuits: 40, neonGlow: 30, mechanical: 90 }
    };
    
    const preset = presets[presetName];
    if (!preset) return;
    
    // Update effects and sliders
    Object.keys(preset).forEach(effect => {
        currentEffects[effect] = preset[effect];
        
        const slider = document.getElementById(effect);
        const valueDisplay = document.getElementById(`${effect}-value`);
        
        if (slider && valueDisplay) {
            slider.value = preset[effect];
            valueDisplay.textContent = `${preset[effect]}%`;
        }
    });
    
    // Apply transformation
    applyCyborgEffects();
}

// Reset transformation to original values
function resetTransformation() {
    applyInitialTransformation();
}

// Download cyborg image
function downloadCyborg() {
    if (!canvas) {
        showError('DOWNLOAD ERROR: No cyborg image data found. Please complete the transformation process first! 💾');
        return;
    }
    
    canvas.toBlob(function(blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${currentHandle}_CYBORG_v1.0.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, 'image/png');
}

// Share cyborg image
function shareCyborg() {
    if (!canvas) {
        showError('SHARE ERROR: No cyborg image to share. Complete transformation first! 📤');
        return;
    }
    
    const shareText = `🤖 CYBORG TRANSFORMATION COMPLETE! 🤖\n\nCreated with Aelina AI v1.0 - The Ultimate Twitter Profile to Cyborg Converter!\n\nHandle: ${currentHandle}\nStatus: CYBORGIFIED ✅\nCompatibility: Windows 95/98/XP\n\nDownload your copy at: https://aelina.ai`;
    
    if (navigator.share && navigator.canShare && navigator.canShare({ files: [] })) {
        canvas.toBlob(function(blob) {
            const file = new File([blob], `${currentHandle}_cyborg.png`, { type: 'image/png' });
            navigator.share({
                title: 'Aelina AI Cyborg Transformation',
                text: shareText,
                files: [file]
            });
        }, 'image/png');
    } else {
        // Fallback to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Share text copied to clipboard! Save your cyborg image manually and share with the copied text! 📋');
        }).catch(() => {
            alert('Unable to copy to clipboard. Please manually save and share your cyborg image! 💾');
        });
    }
}

// Change Twitter handle
function changeHandle() {
    document.getElementById('transformation-section').style.display = 'none';
    document.getElementById('twitter-handle').value = '';
    document.getElementById('twitter-handle').focus();
    
    // Scroll back to input
    document.querySelector('.retro-section').scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
    });
}

// Go back to input (from error)
function goBack() {
    document.getElementById('error-section').style.display = 'none';
    document.getElementById('twitter-handle').focus();
}

// Show error message
function showError(message) {
    document.getElementById('error-message').textContent = message;
    document.getElementById('error-section').style.display = 'block';
    document.getElementById('transformation-section').style.display = 'none';
    
    // Scroll to error
    document.getElementById('error-section').scrollIntoView({ behavior: 'smooth' });
}

// Apply demo effects to gallery images
document.addEventListener('DOMContentLoaded', function() {
    const demoImages = document.querySelectorAll('.cyborg-demo');
    demoImages.forEach(img => {
        img.style.filter = 'contrast(1.2) saturate(1.3) hue-rotate(200deg) brightness(1.1) drop-shadow(0 0 8px rgba(240, 147, 251, 0.5))';
    });
}); 