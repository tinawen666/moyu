// 扩展英文到中文的食物名称映射
const foodTranslations = {
    // 常见食物类别
    'dish': '菜品',
    'food': '食物',
    'meal': '餐点',
    'cuisine': '美食',
    'snack': '零食',
    'dessert': '甜点',

    // 水果类
    'apple': '苹果',
    'banana': '香蕉',
    'orange': '橙子',
    'grape': '葡萄',
    'strawberry': '草莓',
    'watermelon': '西瓜',
    'pear': '梨',
    'peach': '桃子',
    'pineapple': '菠萝',
    'mango': '芒果',
    'fruit': '水果',
    'citrus': '柑橘类',
    'berry': '浆果',

    // 蔬菜类
    'vegetable': '蔬菜',
    'tomato': '西红柿',
    'cucumber': '黄瓜',
    'carrot': '胡萝卜',
    'potato': '土豆',
    'broccoli': '西兰花',
    'cabbage': '卷心菜',
    'lettuce': '生菜',
    'spinach': '菠菜',
    'eggplant': '茄子',
    'pepper': '辣椒',
    'mushroom': '蘑菇',
    'onion': '洋葱',
    'garlic': '大蒜',

    // 肉类
    'meat': '肉类',
    'chicken': '鸡肉',
    'beef': '牛肉',
    'pork': '猪肉',
    'fish': '鱼',
    'seafood': '海鲜',
    'shrimp': '虾',
    'crab': '螃蟹',
    'sausage': '香肠',
    'ham': '火腿',

    // 主食类
    'rice': '米饭',
    'bread': '面包',
    'noodle': '面条',
    'pasta': '意大利面',
    'pancake': '煎饼',
    'dumpling': '饺子',
    'bun': '包子',

    // 饮品类
    'beverage': '饮料',
    'coffee': '咖啡',
    'tea': '茶',
    'milk': '牛奶',
    'juice': '果汁',
    'water': '水',
    'soda': '汽水',

    // 零食类
    'cookie': '饼干',
    'cake': '蛋糕',
    'chocolate': '巧克力',
    'candy': '糖果',
    'ice cream': '冰淇淋',
    'chips': '薯片',
    'popcorn': '爆米花',

    // 调味品
    'sauce': '酱料',
    'soup': '汤',
    'spice': '香料',
    'seasoning': '调味料',

    // 其他
    'ingredient': '食材',
    'organic': '有机',
    'fresh': '新鲜',
    'cooked': '熟食',
    'raw': '生食',
    'processed': '加工食品'
};

// 优化翻译函数
function translateToChineseFood(englishDescription) {
    const lowerDesc = englishDescription.toLowerCase().trim();
    
    // 首先尝试完全匹配
    if (foodTranslations[lowerDesc]) {
        return foodTranslations[lowerDesc];
    }
    
    // 分词处理
    const words = lowerDesc.split(/[\s,]+/);
    let translation = '';
    let matched = false;
    
    // 遍历每个单词尝试匹配
    for (let word of words) {
        if (foodTranslations[word]) {
            translation += foodTranslations[word] + ' ';
            matched = true;
        }
    }
    
    if (matched) {
        return translation.trim();
    }
    
    // 尝试部分匹配
    for (let [eng, chn] of Object.entries(foodTranslations)) {
        if (lowerDesc.includes(eng)) {
            return chn;
        }
    }
    
    return englishDescription;
}

// 添加 findNutritionInfo 函数
function findNutritionInfo(prediction) {
    const predictionLower = prediction.toLowerCase();
    for (let key in nutritionDB) {
        if (predictionLower.includes(key)) {
            return nutritionDB[key];
        }
    }
    return null;
}

// 修改 displayResults 函数，添加更多日志输出
function displayResults(data) {
    const { predictions, nutrition } = data;
    console.log('识别结果:', predictions);
    
    let html = `
        <h2>识别结果</h2>
        <div class="nutrition-item">
            <h3>AI识别结果:</h3>
            <ul>
    `;

    predictions.forEach(pred => {
        const chineseName = translateToChineseFood(pred.className);
        console.log('翻译:', pred.className, '=>', chineseName);
        html += `<li>${chineseName} (${pred.className}) - 可信度: ${(pred.probability * 100).toFixed(2)}%</li>`;
    });

    html += '</ul>';

    if (nutrition) {
        html += `
            <h4>${nutrition.name}的营养成分:</h4>
            <p>热量: ${nutrition.calories} 千卡</p>
            <ul>
                <li>碳水化合物: ${nutrition.nutrition.carbohydrates}</li>
                <li>蛋白质: ${nutrition.nutrition.protein}</li>
                <li>脂肪: ${nutrition.nutrition.fat}</li>
                <li>膳食纤维: ${nutrition.nutrition.fiber}</li>
                <li>糖分: ${nutrition.nutrition.sugar}</li>
            </ul>
        `;
    } else {
        const topPrediction = translateToChineseFood(predictions[0].className);
        html += `
            <p>提示：当前识别的可能是 "${topPrediction}"，但暂无该食物的详细营养信息。</p>
        `;
    }

    html += '</div>';
    results.innerHTML = html;
}

// 扩展营养数据库
const nutritionDB = {
    'apple': {
        name: '苹果',
        calories: 52,
        nutrition: {
            carbohydrates: '14g',
            protein: '0.3g',
            fat: '0.2g',
            fiber: '2.4g',
            sugar: '10g'
        }
    },
    'banana': {
        name: '香蕉',
        calories: 89,
        nutrition: {
            carbohydrates: '23g',
            protein: '1.1g',
            fat: '0.3g',
            fiber: '2.6g',
            sugar: '12g'
        }
    },
    'orange': {
        name: '橙子',
        calories: 47,
        nutrition: {
            carbohydrates: '12g',
            protein: '0.9g',
            fat: '0.1g',
            fiber: '2.4g',
            sugar: '9g'
        }
    },
    'rice': {
        name: '米饭',
        calories: 130,
        nutrition: {
            carbohydrates: '28g',
            protein: '2.7g',
            fat: '0.3g',
            fiber: '0.4g',
            sugar: '0.1g'
        }
    },
    // 可以继续添加更多食物的营养信息...
};

// 食物营养数据库
const foodData = {
    'apple': {
        name: '苹果',
        calories: 52,
        nutrition: {
            carbs: '14g',
            protein: '0.3g',
            fat: '0.2g',
            fiber: '2.4g'
        }
    },
    'banana': {
        name: '香蕉',
        calories: 89,
        nutrition: {
            carbs: '23g',
            protein: '1.1g',
            fat: '0.3g',
            fiber: '2.6g'
        }
    },
    // 可以继续添加更多食物数据
};

// 主程序
class FoodAnalyzer {
    constructor() {
        this.model = null;
        this.currentImage = null;
        this.initElements();
        this.initEventListeners();
        this.loadModel();
    }

    initElements() {
        this.fileInput = document.getElementById('fileInput');
        this.preview = document.getElementById('preview');
        this.status = document.getElementById('status');
        this.analyzeBtn = document.getElementById('analyzeBtn');
        this.loading = document.getElementById('loading');
        this.result = document.getElementById('result');
        this.uploadBox = document.querySelector('.upload-box');
    }

    initEventListeners() {
        this.fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
        this.analyzeBtn.addEventListener('click', () => this.analyzeImage());
        
        // 拖放处理
        this.uploadBox.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.uploadBox.style.borderColor = '#1890ff';
        });

        this.uploadBox.addEventListener('dragleave', () => {
            this.uploadBox.style.borderColor = '#ddd';
        });

        this.uploadBox.addEventListener('drop', (e) => {
            e.preventDefault();
            this.uploadBox.style.borderColor = '#ddd';
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                this.handleFile(file);
            }
        });
    }

    async loadModel() {
        this.loading.style.display = 'block';
        this.status.textContent = '正在加载AI模型...';
        try {
            this.model = await mobilenet.load();
            this.status.textContent = '模型加载完成，请选择图片';
            this.loading.style.display = 'none';
        } catch (error) {
            this.status.textContent = '模型加载失败，请刷新页面重试';
            console.error('模型加载错误:', error);
        }
    }

    handleFileSelect(event) {
        const file = event.target.files[0];
        if (file) {
            this.handleFile(file);
        }
    }

    handleFile(file) {
        if (!file.type.startsWith('image/')) {
            this.status.textContent = '请选择图片文件';
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            this.preview.src = e.target.result;
            this.preview.style.display = 'block';
            
            const img = new Image();
            img.onload = () => {
                this.currentImage = img;
                this.analyzeBtn.disabled = false;
                this.status.textContent = '图片已加载，点击"开始识别"按钮进行识别';
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    async analyzeImage() {
        if (!this.currentImage || !this.model) return;

        this.analyzeBtn.disabled = true;
        this.status.textContent = '正在分析图片...';
        this.result.innerHTML = '';

        try {
            const predictions = await this.model.classify(this.currentImage);
            this.displayResults(predictions);
        } catch (error) {
            this.status.textContent = '识别失败，请重试';
            console.error('识别错误:', error);
        } finally {
            this.analyzeBtn.disabled = false;
        }
    }

    displayResults(predictions) {
        let html = '<h3>识别结果：</h3><ul>';
        
        predictions.forEach(pred => {
            const probability = (pred.probability * 100).toFixed(2);
            html += `<li>${this.translateFood(pred.className)} (${probability}%)</li>`;
        });
        
        html += '</ul>';

        // 查找营养信息
        const foodInfo = this.findFoodInfo(predictions[0].className);
        if (foodInfo) {
            html += `
                <h3>营养成分：</h3>
                <p>热量: ${foodInfo.calories} 千卡</p>
                <ul>
                    <li>碳水化合物: ${foodInfo.nutrition.carbs}</li>
                    <li>蛋白质: ${foodInfo.nutrition.protein}</li>
                    <li>脂肪: ${foodInfo.nutrition.fat}</li>
                    <li>膳食纤维: ${foodInfo.nutrition.fiber}</li>
                </ul>
            `;
        }

        this.result.innerHTML = html;
        this.status.textContent = '识别完成！';
    }

    translateFood(englishName) {
        const lowerName = englishName.toLowerCase();
        for (let key in foodData) {
            if (lowerName.includes(key)) {
                return foodData[key].name;
            }
        }
        return englishName;
    }

    findFoodInfo(foodName) {
        const lowerName = foodName.toLowerCase();
        for (let key in foodData) {
            if (lowerName.includes(key)) {
                return foodData[key];
            }
        }
        return null;
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new FoodAnalyzer();
}); 