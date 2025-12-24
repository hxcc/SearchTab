// 搜索引擎配置
const SEARCH_ENGINES = {
    google: {
        name: '谷歌搜索',
        url: 'https://www.google.com/search?q={query}',
        icon: 'fab fa-google',
        color: '#4285f4'
    },
    baidu: {
        name: '百度搜索',
        url: 'https://www.baidu.com/s?wd={query}',
        icon: 'fab fa-baidu',
        color: '#2932e1'
    },
    bing: {
        name: '必应搜索',
        url: 'https://www.bing.com/search?q={query}',
        icon: 'fab fa-microsoft',
        color: '#0078d4'
    }
};

// 当前选中的搜索引擎
let currentEngine = 'baidu';
let customSearches = [];

// 最大行数配置
const MAX_ROWS = 10;
let customRows = [];

// 书签相关变量
let allBookmarks = [];
let allFolders = [];
let selectedBookmarks = new Set();
let searchTimeout = null;
let isFolderCollapsed = {};

// 常用图标库
const ICON_LIBRARY = {
    search: [
        { class: 'fas fa-search', name: '搜索' },
        { class: 'fas fa-search-plus', name: '放大搜索' },
        { class: 'fas fa-search-minus', name: '缩小搜索' },
        { class: 'fas fa-binoculars', name: '双筒望远镜' },
        { class: 'fas fa-filter', name: '筛选' },
        { class: 'fas fa-sort', name: '排序' },
        { class: 'fas fa-sort-alpha-down', name: '字母排序' },
        { class: 'fas fa-sort-amount-down', name: '数量排序' },
        { class: 'fas fa-cog', name: '设置' },
        { class: 'fas fa-sliders-h', name: '滑块' }
    ],
    
    social: [
        { class: 'fab fa-google', name: '谷歌' },
        { class: 'fab fa-baidu', name: '百度' },
        { class: 'fab fa-microsoft', name: '微软' },
        { class: 'fab fa-github', name: 'GitHub' },
        { class: 'fab fa-twitter', name: '推特' },
        { class: 'fab fa-facebook', name: 'Facebook' },
        { class: 'fab fa-youtube', name: 'YouTube' },
        { class: 'fab fa-instagram', name: 'Instagram' },
        { class: 'fab fa-linkedin', name: 'LinkedIn' },
        { class: 'fab fa-reddit', name: 'Reddit' },
        { class: 'fab fa-weibo', name: '微博' },
        { class: 'fab fa-weixin', name: '微信' },
        { class: 'fab fa-qq', name: 'QQ' },
        { class: 'fab fa-wikipedia-w', name: '维基百科' },
        { class: 'fab fa-stack-overflow', name: 'Stack Overflow' }
    ],
    
    brand: [
        { class: 'fab fa-apple', name: '苹果' },
        { class: 'fab fa-android', name: '安卓' },
        { class: 'fab fa-windows', name: 'Windows' },
        { class: 'fab fa-linux', name: 'Linux' },
        { class: 'fab fa-chrome', name: 'Chrome' },
        { class: 'fab fa-firefox', name: 'Firefox' },
        { class: 'fab fa-edge', name: 'Edge' },
        { class: 'fab fa-safari', name: 'Safari' },
        { class: 'fab fa-amazon', name: '亚马逊' },
        { class: 'fab fa-ebay', name: 'eBay' },
        { class: 'fab fa-paypal', name: 'PayPal' },
        { class: 'fab fa-visa', name: 'Visa' },
        { class: 'fab fa-mastercard', name: 'MasterCard' },
        { class: 'fab fa-bitcoin', name: '比特币' }
    ],
    
    tools: [
        { class: 'fas fa-tools', name: '工具' },
        { class: 'fas fa-wrench', name: '扳手' },
        { class: 'fas fa-screwdriver', name: '螺丝刀' },
        { class: 'fas fa-hammer', name: '锤子' },
        { class: 'fas fa-cogs', name: '齿轮组' },
        { class: 'fas fa-cube', name: '立方体' },
        { class: 'fas fa-box', name: '盒子' },
        { class: 'fas fa-archive', name: '存档' },
        { class: 'fas fa-database', name: '数据库' },
        { class: 'fas fa-server', name: '服务器' },
        { class: 'fas fa-cloud', name: '云' },
        { class: 'fas fa-download', name: '下载' },
        { class: 'fas fa-upload', name: '上传' },
        { class: 'fas fa-sync', name: '同步' },
        { class: 'fas fa-redo', name: '重做' }
    ],
    
    media: [
        { class: 'fas fa-image', name: '图片' },
        { class: 'fas fa-photo-video', name: '照片视频' },
        { class: 'fas fa-film', name: '电影' },
        { class: 'fas fa-music', name: '音乐' },
        { class: 'fas fa-book', name: '书籍' },
        { class: 'fas fa-newspaper', name: '报纸' },
        { class: 'fas fa-file', name: '文件' },
        { class: 'fas fa-file-alt', name: '文本文件' },
        { class: 'fas fa-file-pdf', name: 'PDF文件' },
        { class: 'fas fa-file-word', name: 'Word文件' },
        { class: 'fas fa-file-excel', name: 'Excel文件' },
        { class: 'fas fa-file-powerpoint', name: 'PPT文件' },
        { class: 'fas fa-folder', name: '文件夹' },
        { class: 'fas fa-folder-open', name: '打开文件夹' },
        { class: 'fas fa-save', name: '保存' }
    ],
    
    other: [
        { class: 'fas fa-home', name: '首页' },
        { class: 'fas fa-globe', name: '地球' },
        { class: 'fas fa-map-marker-alt', name: '位置标记' },
        { class: 'fas fa-envelope', name: '信封' },
        { class: 'fas fa-phone', name: '电话' },
        { class: 'fas fa-calendar', name: '日历' },
        { class: 'fas fa-clock', name: '时钟' },
        { class: 'fas fa-user', name: '用户' },
        { class: 'fas fa-users', name: '用户组' },
        { class: 'fas fa-key', name: '钥匙' },
        { class: 'fas fa-lock', name: '锁' },
        { class: 'fas fa-unlock', name: '解锁' },
        { class: 'fas fa-shield-alt', name: '盾牌' },
        { class: 'fas fa-bell', name: '铃铛' },
        { class: 'fas fa-star', name: '星星' }
    ]
};

// 所有图标（用于"全部"分类）
const ALL_ICONS = Object.values(ICON_LIBRARY).flat();

// 获取默认壁纸URL
function getDefaultWallpaperURL() {
    return chrome.runtime.getURL('default-wallpaper.jpg');
}

// DOM元素
const backgroundImage = document.getElementById('backgroundImage');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const settingsBtn = document.getElementById('settingsBtn');
const settingsPanel = document.getElementById('settingsPanel');
const closeSettingsBtn = document.getElementById('closeSettingsBtn');
const currentDate = document.getElementById('currentDate');
const currentTime = document.getElementById('currentTime');
const changeWallpaperBtn = document.getElementById('changeWallpaperBtn');
const wallpaperUpload = document.getElementById('wallpaperUpload');
const wallpaperPresets = document.querySelectorAll('.wallpaper-preset');
const resetWallpaperBtn = document.getElementById('resetWallpaperBtn');
const clearDataBtn = document.getElementById('clearDataBtn');
const showTimeDate = document.getElementById('showTimeDate');

// 自定义搜索相关的DOM元素
const customSearchName = document.getElementById('customSearchName');
const customSearchUrl = document.getElementById('customSearchUrl');
const customSearchIcon = document.getElementById('customSearchIcon');
const addCustomSearchBtn = document.getElementById('addCustomSearchBtn');
const customSearchList = document.getElementById('customSearchList');
const clearCustomSearchesBtn = document.getElementById('clearCustomSearchesBtn');
const exportSearchesBtn = document.getElementById('exportSearchesBtn');
const importSearchesBtn = document.getElementById('importSearchesBtn');
const importFileInput = document.getElementById('importFileInput');

// 书签相关的DOM元素
const bookmarksPanel = document.getElementById('bookmarksPanel');
const closeBookmarksBtn = document.getElementById('closeBookmarksBtn');
const bookmarksOverlay = document.getElementById('bookmarksOverlay');
const bookmarkSearchInput = document.getElementById('bookmarkSearchInput');
const bookmarksList = document.getElementById('bookmarksList');
const bookmarksLoading = document.getElementById('bookmarksLoading');
const selectionInfo = document.getElementById('selectionInfo');
const deleteSelectedBtn = document.getElementById('deleteSelectedBtn');
const newFolderBtn = document.getElementById('newFolderBtn');
const addBookmarkBtn = document.getElementById('addBookmarkBtn');

// 对话框相关元素
const newFolderDialog = document.getElementById('newFolderDialog');
const closeFolderDialog = document.getElementById('closeFolderDialog');
const folderNameInput = document.getElementById('folderNameInput');
const cancelFolderBtn = document.getElementById('cancelFolderBtn');
const createFolderBtn = document.getElementById('createFolderBtn');

const newBookmarkDialog = document.getElementById('newBookmarkDialog');
const closeBookmarkDialog = document.getElementById('closeBookmarkDialog');
const bookmarkNameInput = document.getElementById('bookmarkNameInput');
const bookmarkUrlInput = document.getElementById('bookmarkUrlInput');
const bookmarkFolderSelect = document.getElementById('bookmarkFolderSelect');
const cancelBookmarkBtn = document.getElementById('cancelBookmarkBtn');
const createBookmarkBtn = document.getElementById('createBookmarkBtn');

// 初始化自定义行
function initCustomRows() {
    const existingRows = [
        { id: 1, element: document.getElementById('quickButtons'), align: 'center' }
    ];
    
    customRows.forEach(row => {
        if (row.id > 1 && row.element && row.element.parentNode) {
            row.element.remove();
        }
    });
    
    customRows = existingRows;
    
    chrome.storage.sync.get(['customRows'], (result) => {
        const savedRows = result.customRows || [];
        
        savedRows.sort((a, b) => a.id - b.id).forEach(rowConfig => {
            if (rowConfig.id > 1) {
                createCustomRow(rowConfig.id, rowConfig.align || 'center');
            }
        });
    });
}

// 创建自定义行
function createCustomRow(rowId, align = 'center') {
    const existingRow = customRows.find(row => row.id === rowId);
    if (existingRow) return existingRow;
    
    const rowDiv = document.createElement('div');
    rowDiv.className = `custom-buttons-row ${align}-align`;
    rowDiv.id = `customRow${rowId}`;
    
    let insertBeforeElement = null;
    
    for (let i = 0; i < customRows.length; i++) {
        if (customRows[i].id > rowId) {
            insertBeforeElement = customRows[i].element;
            break;
        }
    }
    
    const mainContent = document.querySelector('.main-content');
    if (insertBeforeElement) {
        insertBeforeElement.parentNode.insertBefore(rowDiv, insertBeforeElement);
    } else {
        const lastRow = customRows[customRows.length - 1];
        if (lastRow) {
            lastRow.element.insertAdjacentElement('afterend', rowDiv);
        } else {
            const quickButtons = document.getElementById('quickButtons');
            quickButtons.insertAdjacentElement('afterend', rowDiv);
        }
    }
    
    const rowObj = { id: rowId, element: rowDiv, align };
    
    customRows.push(rowObj);
    customRows.sort((a, b) => a.id - b.id);
    
    saveRowConfig();
    
    return rowObj;
}

// 更新行选择器
function updateRowSelection() {
    const rowSelect = document.getElementById('customSearchRow');
    const existingRowsInfo = document.getElementById('existingRowsInfo');
    
    if (!rowSelect) return;
    
    const currentValue = rowSelect.value;
    
    rowSelect.innerHTML = '';
    
    const rowsWithButtons = new Set();
    
    rowsWithButtons.add(1);
    
    customSearches.forEach(engine => {
        rowsWithButtons.add(engine.row);
    });
    
    for (let i = 1; i <= 10; i++) {
        const option = document.createElement('option');
        option.value = i;
        
        const hasButtons = rowsWithButtons.has(i);
        
        option.textContent = i === 1 ? `第${i}行（固定按钮行）` : 
                            (hasButtons ? `第${i}行（有按钮）` : `第${i}行`);
        
        if (hasButtons) {
            option.style.color = '#4285f4';
        }
        
        rowSelect.appendChild(option);
    }
    
    if (currentValue && rowSelect.querySelector(`option[value="${currentValue}"]`)) {
        rowSelect.value = currentValue;
    } else {
        rowSelect.value = '2';
    }
    
    if (existingRowsInfo) {
        const sortedRows = Array.from(rowsWithButtons).sort((a, b) => a - b);
        if (sortedRows.length > 0) {
            const rowInfo = sortedRows.map(row => `第${row}行`).join('、');
            existingRowsInfo.textContent = `有按钮的行：${rowInfo}`;
        } else {
            existingRowsInfo.textContent = '暂无自定义按钮，将自动创建新行';
        }
    }
}

// 保存行配置
function saveRowConfig() {
    const rowsToSave = customRows.filter(row => row.id > 1);
    chrome.storage.sync.set({ customRows: rowsToSave });
}

// 初始化图标选择器
function initIconSelector() {
    const iconInput = document.getElementById('customSearchIcon');
    const iconPreview = document.getElementById('iconPreview');
    const iconSelector = document.getElementById('iconSelector');
    const closeIconSelector = document.getElementById('closeIconSelector');
    const iconGrid = document.getElementById('iconGrid');
    const iconCategories = document.querySelectorAll('.icon-category-btn');
    
    if (!iconInput) return;
    
    iconInput.addEventListener('click', () => {
        iconSelector.style.display = 'block';
        if (iconGrid.children.length === 0) {
            renderIconGrid('all');
        }
    });
    
    closeIconSelector.addEventListener('click', () => {
        iconSelector.style.display = 'none';
    });
    
    document.addEventListener('click', (e) => {
        if (iconSelector && !iconSelector.contains(e.target) && e.target !== iconInput) {
            iconSelector.style.display = 'none';
        }
    });
    
    iconCategories.forEach(btn => {
        btn.addEventListener('click', () => {
            iconCategories.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.dataset.category;
            renderIconGrid(category);
        });
    });
    
    function renderIconGrid(category) {
        iconGrid.innerHTML = '';
        
        let iconsToShow = [];
        
        if (category === 'all') {
            iconsToShow = ALL_ICONS;
        } else {
            iconsToShow = ICON_LIBRARY[category] || [];
        }
        
        iconsToShow.forEach(icon => {
            const iconElement = document.createElement('div');
            iconElement.className = 'icon-item';
            iconElement.title = icon.name;
            iconElement.innerHTML = `<i class="${icon.class}"></i>`;
            
            iconElement.addEventListener('click', () => {
                iconInput.value = icon.class;
                iconPreview.className = icon.class;
                iconSelector.style.display = 'none';
            });
            
            iconGrid.appendChild(iconElement);
        });
    }
    
    iconInput.addEventListener('input', () => {
        const iconClass = iconInput.value.trim();
        if (iconClass) {
            try {
                iconPreview.className = iconClass;
            } catch (e) {
                iconPreview.className = 'fas fa-search';
            }
        } else {
            iconPreview.className = 'fas fa-search';
        }
    });
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    initEventListeners();
    updateDateTime();
    loadSettings();
    loadCustomSearches();
    initBookmarkEvents();
    
    setInterval(updateDateTime, 1000);
    
    initIconSelector();
    
    // 添加书签对话框关闭事件
    document.addEventListener('click', (e) => {
        if (newBookmarkDialog.classList.contains('open') && 
            e.target.classList.contains('dialog-overlay')) {
            hideNewBookmarkDialog();
        }
    });
    
    // 回车键提交添加书签表单
    bookmarkNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            bookmarkUrlInput.focus();
        }
    });
    
    bookmarkUrlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            createNewBookmark();
        }
    });
});

// 初始化事件监听器
function initEventListeners() {
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    document.getElementById('quickGoogle').addEventListener('click', () => {
        searchWithEngine('google');
    });
    
    document.getElementById('quickBaidu').addEventListener('click', () => {
        searchWithEngine('baidu');
    });
    
    document.getElementById('quickBing').addEventListener('click', () => {
        searchWithEngine('bing');
    });
    
    settingsBtn.addEventListener('click', () => {
        settingsPanel.classList.add('open');
    });
    
    closeSettingsBtn.addEventListener('click', () => {
        settingsPanel.classList.remove('open');
    });
    
    changeWallpaperBtn.addEventListener('click', () => {
        wallpaperUpload.click();
    });
    
    wallpaperUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                backgroundImage.style.backgroundImage = `url(${e.target.result})`;
                chrome.storage.sync.set({ customWallpaper: e.target.result });
            };
            reader.readAsDataURL(file);
        }
    });
    
    wallpaperPresets.forEach(preset => {
        preset.addEventListener('click', () => {
            const imgUrl = preset.dataset.img;
            backgroundImage.style.backgroundImage = `url(${imgUrl})`;
            chrome.storage.sync.set({ wallpaper: imgUrl, customWallpaper: '' });
        });
    });
    
    resetWallpaperBtn.addEventListener('click', () => {
        const defaultWallpaperURL = getDefaultWallpaperURL();
        backgroundImage.style.backgroundImage = `url(${defaultWallpaperURL})`;
        chrome.storage.sync.set({ wallpaper: '', customWallpaper: '' });
    });
    
    document.querySelectorAll('input[name="defaultEngine"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            chrome.storage.sync.set({ defaultEngine: e.target.value });
            currentEngine = e.target.value;
        });
    });
    
    showTimeDate.addEventListener('change', (e) => {
        chrome.storage.sync.set({ showTimeDate: e.target.checked });
        updateDateTimeDisplay();
    });
    
    clearDataBtn.addEventListener('click', () => {
        if (confirm('确定要清除所有设置吗？')) {
            chrome.storage.sync.clear(() => {
                alert('设置已清除');
                const defaultWallpaperURL = getDefaultWallpaperURL();
                backgroundImage.style.backgroundImage = `url(${defaultWallpaperURL})`;
                location.reload();
            });
        }
    });
    
    addCustomSearchBtn.addEventListener('click', addCustomSearch);
    clearCustomSearchesBtn.addEventListener('click', clearCustomSearches);
    
    if (exportSearchesBtn) {
        exportSearchesBtn.addEventListener('click', exportCustomSearches);
    }
    
    if (importSearchesBtn) {
        importSearchesBtn.addEventListener('click', () => {
            importFileInput.click();
        });
    }
    
    if (importFileInput) {
        importFileInput.addEventListener('change', importCustomSearches);
    }
    
    document.getElementById('historyBtn').addEventListener('click', () => {
        chrome.tabs.create({ url: 'chrome://history/' });
    });
}

// 初始化书签事件监听器
function initBookmarkEvents() {
    console.log('初始化书签事件...');
    
    document.getElementById('bookmarksBtn').addEventListener('click', () => {
        console.log('打开书签面板');
        openBookmarksPanel();
    });
    
    closeBookmarksBtn.addEventListener('click', closeBookmarksPanel);
    bookmarksOverlay.addEventListener('click', closeBookmarksPanel);
    
    bookmarkSearchInput.addEventListener('input', handleBookmarkSearch);
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', handleFilterChange);
    });
    
    newFolderBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('点击新建分类按钮');
        showNewFolderDialog();
    });
    
    addBookmarkBtn.addEventListener('click', showNewBookmarkDialog);
    
    deleteSelectedBtn.addEventListener('click', deleteSelectedBookmarks);
    
    closeFolderDialog.addEventListener('click', (e) => {
        e.stopPropagation();
        hideNewFolderDialog();
    });
    
    cancelFolderBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        hideNewFolderDialog();
    });
    
    createFolderBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        createNewFolder();
    });
    
    closeBookmarkDialog.addEventListener('click', (e) => {
        e.stopPropagation();
        hideNewBookmarkDialog();
    });
    
    cancelBookmarkBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        hideNewBookmarkDialog();
    });
    
    createBookmarkBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        createNewBookmark();
    });
}

// 导出自定义搜索引擎配置
function exportCustomSearches() {
    const exportData = {
        version: '1.0',
        timestamp: new Date().toISOString(),
        customSearches: customSearches,
        rows: customRows.filter(row => row.id > 1)
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `search-tab-config-${new Date().toISOString().slice(0,10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

// 导入自定义搜索配置
function importCustomSearches(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const importData = JSON.parse(e.target.result);
            
            if (!importData.customSearches || !Array.isArray(importData.customSearches)) {
                throw new Error('文件格式不正确：缺少customSearches数组');
            }
            
            if (customSearches.length > 0) {
                const choice = confirm(`当前已有 ${customSearches.length} 个自定义搜索引擎。\n请选择导入方式：\n确定 = 合并导入（保留现有的）\n取消 = 替换导入（清除现有的后导入）`);
                
                if (!choice) {
                    customSearches = [];
                    customRows.forEach(row => {
                        if (row.id > 1 && row.element && row.element.parentNode) {
                            row.element.remove();
                        }
                    });
                    customRows = customRows.filter(row => row.id === 1);
                }
            }
            
            if (importData.rows && Array.isArray(importData.rows)) {
                importData.rows.forEach(rowConfig => {
                    if (rowConfig.id > 1) {
                        createCustomRow(rowConfig.id, rowConfig.align || 'center');
                    }
                });
            }
            
            importData.customSearches.forEach(engine => {
                ensureRowExists(engine.row, engine.align || 'center');
                
                const existingIndex = customSearches.findIndex(e => e.name === engine.name && e.url === engine.url);
                if (existingIndex === -1) {
                    const uniqueEngine = {
                        ...engine,
                        id: 'custom_' + Date.now() + Math.random().toString(36).substr(2, 9)
                    };
                    customSearches.push(uniqueEngine);
                }
            });
            
            saveCustomSearches();
            saveRowConfig();
            renderCustomSearchButtons();
            renderCustomSearchList();
            updateRowSelection();
            
            alert(`成功导入 ${importData.customSearches.length} 个自定义搜索引擎！`);
            
        } catch (error) {
            alert('导入失败：' + error.message);
            console.error('导入错误：', error);
        }
        
        event.target.value = '';
    };
    
    reader.readAsText(file);
}

// 使用指定搜索引擎搜索
function searchWithEngine(engineId) {
    currentEngine = engineId;
    performSearch();
}

// 执行搜索
function performSearch() {
    const query = searchInput.value.trim();
    if (!query) {
        searchInput.focus();
        return;
    }
    
    let engine = SEARCH_ENGINES[currentEngine];
    
    if (!engine) {
        const customEngine = customSearches.find(s => s.id === currentEngine);
        if (customEngine) {
            engine = customEngine;
        } else {
            engine = SEARCH_ENGINES.google;
            currentEngine = 'google';
        }
    }
    
    let searchUrl;
    
    if (engine.isImageSearch && (query.startsWith('http') || query.startsWith('data:'))) {
        searchUrl = engine.url.replace('{query}', encodeURIComponent(query));
    } else {
        searchUrl = engine.url.replace('{query}', encodeURIComponent(query));
    }
    
    window.open(searchUrl, '_blank');
    searchInput.value = '';
    searchInput.focus();
}

// 更新日期时间
function updateDateTime() {
    const now = new Date();
    const dateStr = now.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    });
    
    const timeStr = now.toLocaleTimeString('zh-CN', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    currentDate.textContent = dateStr;
    currentTime.textContent = timeStr;
}

// 更新日期时间显示
function updateDateTimeDisplay() {
    const show = showTimeDate.checked;
    currentDate.style.display = show ? 'inline' : 'none';
    currentTime.style.display = show ? 'inline' : 'none';
}

// 加载设置
function loadSettings() {
    chrome.storage.sync.get(['wallpaper', 'customWallpaper', 'defaultEngine', 'showTimeDate'], (result) => {
        if (result.customWallpaper) {
            backgroundImage.style.backgroundImage = `url(${result.customWallpaper})`;
        } else if (result.wallpaper) {
            backgroundImage.style.backgroundImage = `url(${result.wallpaper})`;
        } else {
            const defaultWallpaperURL = getDefaultWallpaperURL();
            backgroundImage.style.backgroundImage = `url(${defaultWallpaperURL})`;
        }
        
        if (result.defaultEngine) {
            currentEngine = result.defaultEngine;
            
            document.querySelectorAll('input[name="defaultEngine"]').forEach(radio => {
                radio.checked = radio.value === result.defaultEngine;
            });
        }
        
        if (result.showTimeDate !== undefined) {
            showTimeDate.checked = result.showTimeDate;
            updateDateTimeDisplay();
        }
    });
}

// 确保行存在
function ensureRowExists(rowId, align = 'center') {
    if (rowId === 1) return document.getElementById('quickButtons');
    
    let row = customRows.find(r => r.id === rowId);
    
    if (!row) {
        row = createCustomRow(rowId, align);
    }
    
    return row.element;
}

// 添加自定义搜索引擎
function addCustomSearch() {
    const name = customSearchName.value.trim();
    let url = customSearchUrl.value.trim();
    const icon = customSearchIcon.value.trim();
    const row = parseInt(document.getElementById('customSearchRow').value);
    const align = document.querySelector('input[name="customSearchAlign"]:checked').value;
    
    if (!name || !url) {
        alert('请填写搜索引擎名称和URL');
        return;
    }
    
    if (url.includes('%s')) {
        url = url.replace(/%s/g, '{query}');
    } else if (!url.includes('{query}')) {
        alert('URL中必须包含{query}作为搜索词的占位符');
        return;
    }
    
    ensureRowExists(row, align);
    
    const id = 'custom_' + Date.now();
    const customSearch = {
        id,
        name,
        url,
        icon: icon || 'fas fa-search',
        row: row,
        align,
        isCustom: true
    };
    
    customSearches.push(customSearch);
    saveCustomSearches();
    renderCustomSearchButtons();
    renderCustomSearchList();
    
    updateRowSelection();
    
    customSearchName.value = '';
    customSearchUrl.value = '';
    customSearchIcon.value = '';
    
    const iconPreview = document.getElementById('iconPreview');
    if (iconPreview) {
        iconPreview.className = 'fas fa-search';
    }
    
    alert('搜索引擎添加成功！');
}

// 保存自定义搜索引擎
function saveCustomSearches() {
    chrome.storage.sync.set({ customSearches: customSearches });
}

// 加载自定义搜索引擎
function loadCustomSearches() {
    chrome.storage.sync.get(['customSearches', 'customRows'], (result) => {
        if (result.customSearches) {
            customSearches = result.customSearches;
        }
        
        initCustomRows();
        
        customSearches.forEach(engine => {
            if (engine.row > 1) {
                const rowExists = customRows.some(row => row.id === engine.row);
                if (!rowExists) {
                    createCustomRow(engine.row, engine.align || 'center');
                }
            }
        });
        
        renderCustomSearchButtons();
        renderCustomSearchList();
        
        updateRowSelection();
    });
}

// 渲染自定义搜索按钮
function renderCustomSearchButtons() {
    customRows.forEach(row => {
        if (row.id > 1) {
            row.element.innerHTML = '';
        }
    });
    
    const quickButtons = document.getElementById('quickButtons');
    const firstRowCustomBtns = quickButtons.querySelectorAll('.custom-btn');
    firstRowCustomBtns.forEach(btn => btn.remove());
    
    customRows.forEach(row => {
        if (row.id > 1) {
            row.element.className = `custom-buttons-row ${row.align}-align`;
            row.element.id = `customRow${row.id}`;
        }
    });
    
    const enginesByRow = {};
    customSearches.forEach(engine => {
        if (!enginesByRow[engine.row]) {
            enginesByRow[engine.row] = [];
        }
        enginesByRow[engine.row].push(engine);
    });
    
    Object.keys(enginesByRow).sort((a, b) => a - b).forEach(rowId => {
        const engines = enginesByRow[rowId];
        
        engines.forEach(engine => {
            const button = createCustomSearchButton(engine);
            
            const targetRow = customRows.find(row => row.id == rowId);
            if (targetRow) {
                targetRow.element.appendChild(button);
            } else {
                quickButtons.appendChild(button);
            }
        });
    });
}

// 创建自定义搜索按钮
function createCustomSearchButton(engine) {
    const button = document.createElement('button');
    button.className = 'custom-btn';
    button.dataset.engineId = engine.id;
    
    button.innerHTML = `
        <i class="${engine.icon}"></i>
        <span>${engine.name}</span>
        <button class="remove-btn" title="删除">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    button.addEventListener('click', (e) => {
        if (!e.target.closest('.remove-btn')) {
            currentEngine = engine.id;
            performSearch();
        }
    });
    
    const removeBtn = button.querySelector('.remove-btn');
    removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm(`确定要删除"${engine.name}"吗？`)) {
            removeCustomSearch(engine.id);
        }
    });
    
    return button;
}

// 移除自定义搜索引擎
function removeCustomSearch(engineId) {
    const engineToRemove = customSearches.find(engine => engine.id === engineId);
    if (!engineToRemove) return;
    
    const rowId = engineToRemove.row;
    
    customSearches = customSearches.filter(engine => engine.id !== engineId);
    saveCustomSearches();
    
    renderCustomSearchButtons();
    renderCustomSearchList();
    
    const rowHasOtherButtons = customSearches.some(engine => engine.row === rowId);
    
    if (!rowHasOtherButtons && rowId > 1) {
        const rowIndex = customRows.findIndex(row => row.id === rowId);
        if (rowIndex !== -1) {
            const row = customRows[rowIndex];
            if (row.element && row.element.parentNode) {
                row.element.remove();
            }
            customRows.splice(rowIndex, 1);
            saveRowConfig();
        }
    }
    
    if (currentEngine === engineId) {
        currentEngine = 'google';
    }
    
    updateRowSelection();
}

// 渲染自定义搜索引擎列表
function renderCustomSearchList() {
    customSearchList.innerHTML = '';
    
    if (customSearches.length === 0) {
        customSearchList.innerHTML = '<p style="text-align: center; color: #666; font-size: 14px;">暂无自定义搜索引擎</p>';
        return;
    }
    
    customSearches.forEach(engine => {
        const item = document.createElement('div');
        item.className = 'custom-search-item';
        
        item.innerHTML = `
            <div class="search-info">
                <i class="${engine.icon}"></i>
                <span>${engine.name}</span>
                <small style="color: #666; font-size: 12px;">(${engine.row === 1 ? '第一行' : '第' + engine.row + '行'})</small>
            </div>
            <button class="remove-item" data-id="${engine.id}">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        const removeBtn = item.querySelector('.remove-item');
        removeBtn.addEventListener('click', () => {
            if (confirm(`确定要删除"${engine.name}"吗？`)) {
                removeCustomSearch(engine.id);
            }
        });
        
        customSearchList.appendChild(item);
    });
}

// 清除所有自定义搜索引擎
function clearCustomSearches() {
    if (customSearches.length === 0) {
        alert('没有自定义搜索引擎可清除');
        return;
    }
    
    if (confirm('确定要清除所有自定义搜索引擎吗？')) {
        customSearches = [];
        saveCustomSearches();
        
        customRows.forEach(row => {
            if (row.id > 1 && row.element && row.element.parentNode) {
                row.element.remove();
            }
        });
        
        customRows = customRows.filter(row => row.id === 1);
        saveRowConfig();
        
        renderCustomSearchButtons();
        renderCustomSearchList();
        
        if (currentEngine.startsWith('custom_')) {
            currentEngine = 'google';
        }
        
        updateRowSelection();
        
        alert('已清除所有自定义搜索引擎');
    }
}

// ==================== 书签功能 ====================

// 打开书签面板
function openBookmarksPanel() {
    bookmarksPanel.classList.add('open');
    bookmarksOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    loadBookmarks();
}

// 关闭书签面板
function closeBookmarksPanel() {
    bookmarksPanel.classList.remove('open');
    bookmarksOverlay.classList.remove('active');
    document.body.style.overflow = '';
    
    bookmarkSearchInput.value = '';
    selectedBookmarks.clear();
    updateSelectionInfo();
}

// 显示新建分类对话框
function showNewFolderDialog() {
    const dialogOverlay = document.createElement('div');
    dialogOverlay.id = 'dialogOverlay';
    dialogOverlay.className = 'dialog-overlay';
    document.body.appendChild(dialogOverlay);
    
    newFolderDialog.classList.add('open');
    folderNameInput.value = '';
    
    dialogOverlay.addEventListener('click', hideNewFolderDialog);
    
    setTimeout(() => {
        folderNameInput.focus();
    }, 100);
}

// 隐藏新建分类对话框
function hideNewFolderDialog() {
    newFolderDialog.classList.remove('open');
    const dialogOverlay = document.getElementById('dialogOverlay');
    if (dialogOverlay) {
        dialogOverlay.remove();
    }
}

// 创建新分类
function createNewFolder() {
    const folderName = folderNameInput.value.trim();
    if (!folderName) {
        alert('请输入分类名称');
        folderNameInput.focus();
        return;
    }
    
    if (!chrome.bookmarks) {
        alert('浏览器书签API不可用，请检查扩展权限');
        return;
    }
    
    console.log('创建分类:', folderName);
    
    chrome.bookmarks.create({
        title: folderName,
        parentId: '1'
    }, (newFolder) => {
        if (chrome.runtime.lastError) {
            console.error('创建分类失败:', chrome.runtime.lastError);
            alert('创建分类失败: ' + chrome.runtime.lastError.message);
            return;
        }
        
        console.log('分类创建成功:', newFolder);
        hideNewFolderDialog();
        
        setTimeout(() => {
            loadBookmarks();
        }, 300);
        
        showToast('分类创建成功');
    });
}

// 显示添加书签对话框
function showNewBookmarkDialog() {
    const dialogOverlay = document.createElement('div');
    dialogOverlay.id = 'dialogOverlayBookmark';
    dialogOverlay.className = 'dialog-overlay';
    document.body.appendChild(dialogOverlay);
    
    newBookmarkDialog.classList.add('open');
    bookmarkNameInput.value = '';
    bookmarkUrlInput.value = '';
    
    updateBookmarkFolderSelect();
    
    dialogOverlay.addEventListener('click', hideNewBookmarkDialog);
    
    setTimeout(() => {
        bookmarkNameInput.focus();
    }, 100);
}

// 隐藏添加书签对话框
function hideNewBookmarkDialog() {
    newBookmarkDialog.classList.remove('open');
    const dialogOverlay = document.getElementById('dialogOverlayBookmark');
    if (dialogOverlay) {
        dialogOverlay.remove();
    }
}

// 更新书签文件夹选择器
function updateBookmarkFolderSelect() {
    bookmarkFolderSelect.innerHTML = '';
    
    const defaultOptions = [
        { id: '1', title: '书签栏' },
        { id: '2', title: '其他书签' }
    ];
    
    defaultOptions.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option.id;
        opt.textContent = option.title;
        bookmarkFolderSelect.appendChild(opt);
    });
    
    allFolders.forEach(folder => {
        if (folder.id !== '0' && folder.id !== '1' && folder.id !== '2') {
            const opt = document.createElement('option');
            opt.value = folder.id;
            opt.textContent = folder.title;
            bookmarkFolderSelect.appendChild(opt);
        }
    });
}

// 创建新书签
function createNewBookmark() {
    const name = bookmarkNameInput.value.trim();
    const url = bookmarkUrlInput.value.trim();
    const parentId = bookmarkFolderSelect.value;
    
    if (!name || !url) {
        alert('请输入书签名称和URL');
        return;
    }
    
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        alert('URL必须以http://或https://开头');
        return;
    }
    
    if (!chrome.bookmarks) {
        alert('浏览器书签API不可用，请检查扩展权限');
        return;
    }
    
    console.log('创建书签:', { name, url, parentId });
    
    chrome.bookmarks.create({
        title: name,
        url: url,
        parentId: parentId
    }, (newBookmark) => {
        if (chrome.runtime.lastError) {
            console.error('创建书签失败:', chrome.runtime.lastError);
            alert('创建书签失败: ' + chrome.runtime.lastError.message);
            return;
        }
        
        console.log('书签创建成功:', newBookmark);
        hideNewBookmarkDialog();
        
        setTimeout(() => {
            loadBookmarks();
        }, 300);
        
        showToast('书签添加成功');
    });
}

// 显示提示消息
function showToast(message, duration = 2000) {
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        z-index: 9999;
        font-size: 14px;
        animation: slideUp 0.3s ease;
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// 加载书签
function loadBookmarks() {
    const loading = document.getElementById('bookmarksLoading');
    const bookmarksList = document.getElementById('bookmarksList');
    
    if (!loading || !bookmarksList) return;
    
    loading.style.display = 'flex';
    bookmarksList.innerHTML = '';
    
    console.log('加载书签...');
    
    allBookmarks = [];
    allFolders = [];
    isFolderCollapsed = {};
    selectedBookmarks.clear();
    
    // 测试书签API是否可用
    if (!chrome.bookmarks) {
        console.error('书签API不可用');
        loading.style.display = 'none';
        bookmarksList.innerHTML = `
            <div class="no-bookmarks">
                <i class="fas fa-exclamation-triangle"></i>
                <p>书签API不可用</p>
                <small>请检查扩展权限或重新加载</small>
            </div>
        `;
        return;
    }
    
    chrome.bookmarks.getTree((bookmarkTreeNodes) => {
        if (chrome.runtime.lastError) {
            console.error('获取书签失败:', chrome.runtime.lastError);
            loading.style.display = 'none';
            bookmarksList.innerHTML = `
                <div class="no-bookmarks">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>加载书签失败</p>
                    <small>错误: ${chrome.runtime.lastError.message}</small>
                </div>
            `;
            return;
        }
        
        console.log('原始书签树数据:', bookmarkTreeNodes);
        
        function traverseBookmarks(node, folderPath = '', folderId = '', folderTitle = '') {
            if (!node) return;
            
            // 如果是文件夹
            if (node.children) {
                let currentFolderPath = folderPath;
                let currentFolderId = folderId;
                let currentFolderTitle = folderTitle;
                
                // 如果不是根节点并且有标题
                if (node.id !== '0' && node.id !== '1' && node.id !== '2' && node.title) {
                    currentFolderPath = folderPath ? `${folderPath} > ${node.title}` : node.title;
                    currentFolderId = node.id;
                    currentFolderTitle = node.title;
                    
                    // 添加到文件夹列表
                    allFolders.push({
                        id: node.id,
                        title: node.title,
                        path: currentFolderPath,
                        children: []
                    });
                    
                    // 默认展开状态
                    isFolderCollapsed[node.id] = false;
                    
                    console.log('找到文件夹:', {id: node.id, title: node.title, parentId: node.parentId});
                }
                
                // 遍历子节点
                if (node.children && node.children.length > 0) {
                    node.children.forEach(child => {
                        traverseBookmarks(child, currentFolderPath, currentFolderId, currentFolderTitle);
                    });
                }
            }
            // 如果是书签
            else if (node.url) {
                const bookmark = {
                    id: node.id,
                    title: node.title || '无标题',
                    url: node.url,
                    dateAdded: node.dateAdded || Date.now(),
                    folder: folderPath || '未分类',
                    folderId: folderId || 'root',
                    folderTitle: folderTitle || '未分类',
                    isSelected: false
                };
                
                allBookmarks.push(bookmark);
                
                // 添加到对应文件夹的children
                if (folderId && folderId !== 'root') {
                    const folder = allFolders.find(f => f.id === folderId);
                    if (folder) {
                        folder.children.push(bookmark);
                    }
                }
            }
        }
        
        // 从根节点开始遍历
        if (bookmarkTreeNodes && bookmarkTreeNodes.length > 0) {
            traverseBookmarks(bookmarkTreeNodes[0]);
        }
        
        console.log('加载完成:', {
            书签总数: allBookmarks.length,
            文件夹数: allFolders.length,
        });
        
        loading.style.display = 'none';
        renderBookmarks();
        updateSelectionInfo();
    });
}

// 渲染书签
function renderBookmarks(searchTerm = '') {
    const bookmarksList = document.getElementById('bookmarksList');
    if (!bookmarksList) return;
    
    bookmarksList.innerHTML = '';
    
    // 如果没有数据
    if (allBookmarks.length === 0 && allFolders.length === 0) {
        const emptyDiv = document.createElement('div');
        emptyDiv.className = 'no-bookmarks';
        emptyDiv.innerHTML = `
            <i class="fas fa-bookmark"></i>
            <p>暂无书签</p>
            <small>可以点击右上角的星标添加书签</small>
        `;
        bookmarksList.appendChild(emptyDiv);
        return;
    }
    
    let filteredBookmarks = [...allBookmarks];
    let filteredFolders = [...allFolders];
    
    // 搜索过滤
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filteredBookmarks = filteredBookmarks.filter(bookmark => 
            bookmark.title.toLowerCase().includes(term) || 
            bookmark.url.toLowerCase().includes(term)
        );
        
        // 同时过滤文件夹
        filteredFolders = filteredFolders.filter(folder => 
            folder.title.toLowerCase().includes(term) ||
            folder.children.some(bookmark => 
                bookmark.title.toLowerCase().includes(term) || 
                bookmark.url.toLowerCase().includes(term)
            )
        );
    }
    
    // 获取当前筛选条件
    const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
    
    // 按筛选条件排序
    if (activeFilter === 'recent') {
        filteredBookmarks.sort((a, b) => b.dateAdded - a.dateAdded);
    }
    
    // 按文件夹分组
    const bookmarksByFolder = {};
    
    // 先添加所有文件夹
    filteredFolders.forEach(folder => {
        bookmarksByFolder[folder.id] = {
            folderInfo: folder,
            bookmarks: folder.children.filter(bookmark => 
                filteredBookmarks.some(b => b.id === bookmark.id)
            )
        };
    });
    
    // 处理未分类的书签
    const uncategorizedBookmarks = filteredBookmarks.filter(bookmark => 
        !bookmark.folderId || bookmark.folderId === 'root' || !allFolders.some(f => f.id === bookmark.folderId)
    );
    
    if (uncategorizedBookmarks.length > 0) {
        bookmarksByFolder['root'] = {
            folderInfo: { id: 'root', title: '未分类', path: '未分类' },
            bookmarks: uncategorizedBookmarks
        };
    }
    
    // 渲染每个文件夹
    Object.values(bookmarksByFolder).forEach(({ folderInfo, bookmarks }) => {
        if (bookmarks.length > 0 || folderInfo.id !== 'root') {
            const folderGroup = createFolderElement(folderInfo, bookmarks);
            bookmarksList.appendChild(folderGroup);
        }
    });
    
    // 如果没有内容
    if (bookmarksList.children.length === 0) {
        const emptyDiv = document.createElement('div');
        emptyDiv.className = 'no-bookmarks';
        emptyDiv.innerHTML = `
            <i class="fas fa-search"></i>
            <p>${searchTerm ? '未找到匹配的书签' : '暂无书签'}</p>
            ${searchTerm ? '<small>请尝试其他搜索词</small>' : '<small>可以点击右上角的星标添加书签</small>'}
        `;
        bookmarksList.appendChild(emptyDiv);
    }
}

// 创建文件夹元素
function createFolderElement(folderInfo, bookmarks) {
    const folderGroup = document.createElement('div');
    folderGroup.className = 'folder-group';
    folderGroup.dataset.folderId = folderInfo.id;
    
    if (isFolderCollapsed[folderInfo.id]) {
        folderGroup.classList.add('collapsed');
    }
    
    // 检查文件夹是否全部选中
    const folderBookmarkIds = bookmarks.map(b => b.id);
    const allSelected = folderBookmarkIds.length > 0 && folderBookmarkIds.every(id => selectedBookmarks.has(id));
    
    const folderHeader = document.createElement('div');
    folderHeader.className = 'folder-header';
    if (allSelected) {
        folderHeader.classList.add('selected');
    }
    
    // 文件夹复选框
    const folderCheckbox = document.createElement('div');
    folderCheckbox.className = 'folder-checkbox';
    if (allSelected) {
        folderCheckbox.classList.add('checked');
    }
    folderCheckbox.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFolderSelection(folderInfo.id, bookmarks);
    });
    
    const folderIcon = document.createElement('div');
    folderIcon.className = 'folder-icon';
    folderIcon.innerHTML = `<i class="fas fa-folder"></i>`;
    
    const folderInfoDiv = document.createElement('div');
    folderInfoDiv.className = 'folder-info';
    
    const folderTitle = document.createElement('div');
    folderTitle.className = 'folder-title';
    folderTitle.textContent = folderInfo.title;
    
    const folderCount = document.createElement('div');
    folderCount.className = 'folder-count';
    folderCount.textContent = `${bookmarks.length} 个项目`;
    
    folderInfoDiv.appendChild(folderTitle);
    folderInfoDiv.appendChild(folderCount);
    
    const folderArrow = document.createElement('div');
    folderArrow.className = 'folder-arrow';
    folderArrow.innerHTML = `<i class="fas fa-chevron-down"></i>`;
    
    folderHeader.appendChild(folderCheckbox);
    folderHeader.appendChild(folderIcon);
    folderHeader.appendChild(folderInfoDiv);
    folderHeader.appendChild(folderArrow);
    
    // 文件夹内容
    const folderContent = document.createElement('div');
    folderContent.className = 'folder-content';
    
    // 添加书签项
    bookmarks.forEach(bookmark => {
        folderContent.appendChild(createBookmarkElement(bookmark));
    });
    
    // 点击文件夹头部切换展开/折叠
    folderHeader.addEventListener('click', (e) => {
        if (!e.target.closest('.folder-checkbox')) {
            toggleFolderCollapse(folderInfo.id);
        }
    });
    
    folderGroup.appendChild(folderHeader);
    folderGroup.appendChild(folderContent);
    
    return folderGroup;
}

// 创建书签项元素
function createBookmarkElement(bookmark) {
    const item = document.createElement('div');
    item.className = 'bookmark-item';
    item.dataset.id = bookmark.id;
    
    if (selectedBookmarks.has(bookmark.id)) {
        item.classList.add('selected');
    }
    
    // 多选框
    const checkbox = document.createElement('div');
    checkbox.className = 'bookmark-checkbox';
    if (selectedBookmarks.has(bookmark.id)) {
        checkbox.classList.add('checked');
    }
    checkbox.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleBookmarkSelection(bookmark.id);
    });
    
    // Favicon
    const favicon = document.createElement('div');
    favicon.className = 'bookmark-favicon';
    
    try {
        const url = new URL(bookmark.url);
        const faviconUrl = `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=32`;
        favicon.innerHTML = `<img src="${faviconUrl}" alt="" onerror="this.style.backgroundColor='rgba(66,133,244,0.3)'; this.innerHTML='<span>${bookmark.title.charAt(0).toUpperCase()}</span>'">`;
    } catch {
        favicon.innerHTML = `<span>${bookmark.title.charAt(0).toUpperCase()}</span>`;
    }
    
    // 书签信息
    const info = document.createElement('div');
    info.className = 'bookmark-info';
    
    const title = document.createElement('div');
    title.className = 'bookmark-title';
    title.textContent = bookmark.title;
    
    const url = document.createElement('div');
    url.className = 'bookmark-url';
    url.textContent = bookmark.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
    
    info.appendChild(title);
    info.appendChild(url);
    
    // 操作按钮
    const actions = document.createElement('div');
    actions.className = 'bookmark-actions';
    
    // 删除按钮
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'bookmark-action-btn delete';
    deleteBtn.title = '删除';
    deleteBtn.innerHTML = `<i class="fas fa-trash"></i>`;
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm(`确定要删除书签"${bookmark.title}"吗？`)) {
            deleteBookmark(bookmark.id);
        }
    });
    
    actions.appendChild(deleteBtn);
    
    item.appendChild(checkbox);
    item.appendChild(favicon);
    item.appendChild(info);
    item.appendChild(actions);
    
    // 点击书签打开链接
    item.addEventListener('click', (e) => {
        if (!e.target.closest('.bookmark-checkbox') && !e.target.closest('.bookmark-action-btn')) {
            window.open(bookmark.url, '_blank');
        }
    });
    
    return item;
}

// 书签搜索处理
function handleBookmarkSearch(e) {
    if (searchTimeout) clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        renderBookmarks(e.target.value.trim());
    }, 300);
}

// 筛选条件变化处理
function handleFilterChange(e) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    e.target.classList.add('active');
    renderBookmarks(bookmarkSearchInput.value.trim());
}

// 切换文件夹折叠状态
function toggleFolderCollapse(folderId) {
    isFolderCollapsed[folderId] = !isFolderCollapsed[folderId];
    const folderGroup = document.querySelector(`.folder-group[data-folder-id="${folderId}"]`);
    if (folderGroup) {
        folderGroup.classList.toggle('collapsed');
    }
}

// 切换文件夹选择状态
function toggleFolderSelection(folderId, bookmarks) {
    const folderBookmarkIds = bookmarks.map(b => b.id);
    const allSelected = folderBookmarkIds.length > 0 && folderBookmarkIds.every(id => selectedBookmarks.has(id));
    
    if (allSelected) {
        // 取消选中所有书签
        folderBookmarkIds.forEach(id => {
            selectedBookmarks.delete(id);
        });
    } else {
        // 选中所有书签
        folderBookmarkIds.forEach(id => {
            selectedBookmarks.add(id);
        });
    }
    
    renderBookmarks(bookmarkSearchInput.value.trim());
    updateSelectionInfo();
}

// 切换书签选择状态
function toggleBookmarkSelection(bookmarkId) {
    if (selectedBookmarks.has(bookmarkId)) {
        selectedBookmarks.delete(bookmarkId);
    } else {
        selectedBookmarks.add(bookmarkId);
    }
    
    const bookmarkItem = document.querySelector(`.bookmark-item[data-id="${bookmarkId}"]`);
    if (bookmarkItem) {
        const checkbox = bookmarkItem.querySelector('.bookmark-checkbox');
        if (checkbox) {
            checkbox.classList.toggle('checked', selectedBookmarks.has(bookmarkId));
        }
        bookmarkItem.classList.toggle('selected', selectedBookmarks.has(bookmarkId));
    }
    
    updateSelectionInfo();
}

// 更新选择信息
function updateSelectionInfo() {
    const count = selectedBookmarks.size;
    // 直接显示选中数量，不为0时才显示"已选择 X 个项目"
    selectionInfo.textContent = count > 0 ? `已选择 ${count} 个项目` : '';
    deleteSelectedBtn.disabled = count === 0;
}

// 删除单个书签
function deleteBookmark(bookmarkId) {
    chrome.bookmarks.remove(bookmarkId, () => {
        allBookmarks = allBookmarks.filter(b => b.id !== bookmarkId);
        
        allFolders.forEach(folder => {
            folder.children = folder.children.filter(b => b.id !== bookmarkId);
        });
        
        selectedBookmarks.delete(bookmarkId);
        
        renderBookmarks(bookmarkSearchInput.value.trim());
        updateSelectionInfo();
    });
}

// 删除选中的书签
function deleteSelectedBookmarks() {
    if (selectedBookmarks.size === 0) {
        alert('请先选择要删除的书签');
        return;
    }
    
    if (confirm(`确定要删除选中的 ${selectedBookmarks.size} 个书签吗？`)) {
        selectedBookmarks.forEach(bookmarkId => {
            chrome.bookmarks.remove(bookmarkId);
        });
        
        selectedBookmarks.clear();
        setTimeout(() => {
            loadBookmarks();
            updateSelectionInfo();
        }, 500);
    }
}