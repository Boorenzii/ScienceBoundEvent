/**
 * Event Cost Calculator JavaScript
 * 
 * This script handles the calculations for the May 1st event cost calculator.
 * Link this file to the HTML calculator for functionality.
 */

// Product data - all available products with pricing and serving information
const productData = {
    hotdogs: {
        "ball-park-classic": {name: "Ball Park Classic Original Length Hot Dogs, 24 ct.", price: 6.98, servingsPerUnit: 24},
        "ball-park-beef": {name: "Ball Park Beef Franks, 24 ct.", price: 10.98, servingsPerUnit: 24},
        "nathans": {name: "Nathan's Famous Beef Franks, 24 ct.", price: 9.71, servingsPerUnit: 24},
        "members-mark-cheddar": {name: "Member's Mark Cheddar Cheese Pork Franks, 1/4 lb., 12 ct.", price: 8.64, servingsPerUnit: 12}
    },
    hotdogBuns: {
        "sara-lee-hotdog": {name: "Sara Lee Restaurant Style White Hot Dog Buns 16 ct.", price: 3.58, servingsPerUnit: 16},
        "lakeland-hotdog": {name: "Lakeland Hot Dog Buns 24oz", price: 3.78, servingsPerUnit: 16}
    },
    burgers: {
        "ground-beef-sliders": {name: "Member's Mark Prime Rib Ground Beef Sliders, priced per pound", price: 5.48, servingsPerUnit: 4, isPricePerPound: true},
        "quick-n-eat": {name: "Quick 'N Eat Flame Grilled Angus Beef Patties, Frozen, 1/4 lb., 12 ct.", price: 18.98, servingsPerUnit: 12},
        "don-lee-farms": {name: "Don Lee Farms Flame Grilled Angus Choice Beef Patties, Frozen, 1/4 lb., 12 ct.", price: 19.48, servingsPerUnit: 12},
        "members-mark-8020": {name: "Member's Mark 80/20 Ground Angus Beef Patties, Frozen, 1/3 lb., 18 ct.", price: 25.98, servingsPerUnit: 18},
        "members-mark-8515": {name: "Member's Mark 85/15 Ground Sirloin Beef Patties, Frozen, 1/3 lb., 18 ct.", price: 26.98, servingsPerUnit: 18}
    },
    burgerBuns: {
        "sara-lee-burger": {name: "Sara Lee Restaurant Style White Hamburger Buns 16 ct.", price: 3.78, servingsPerUnit: 16},
        "lakeland-burger": {name: "Lakeland Hamburger Buns 24oz", price: 3.78, servingsPerUnit: 16},
        "brownberry-hawaiian": {name: "Brownberry Hawaiian Hamburger Buns 32 oz., 16 ct.", price: 5.78, servingsPerUnit: 16},
        "brioche-slider": {name: "Member's Mark Sliced Brioche Slider Buns, 24 ct.", price: 6.98, servingsPerUnit: 24}
    },
    toppings: [
        {name: "Kraft Singles American Cheese Slices 3 lbs., 72 ct.", price: 9.36, servingsPerUnit: 72},
        {name: "Heinz Original Tomato Ketchup, 44oz., 3 pk.", price: 9.98, servingsPerUnit: 60},
        {name: "French's 100% Natural Classic Yellow Mustard, 30 oz., 2 pk.", price: 5.48, servingsPerUnit: 50},
        {name: "Iceberg Lettuce, 2 heads", price: 2.72, servingsPerUnit: 16},
        {name: "Tomatoes on the Vine, 3 lbs.", price: 4.92, servingsPerUnit: 20}
    ],
    beverages: {
        water: [{name: "Pure Life Purified Water 16.9 fl. oz., 40 pk.", price: 4.98, servingsPerUnit: 40}],
        mixed: [
            {name: "Pure Life Purified Water 16.9 fl. oz., 40 pk.", price: 4.98, servingsPerUnit: 40},
            {name: "Pepsi Cola 12 fl. oz., 36 pk.", price: 17.98, servingsPerUnit: 36},
            {name: "Coca-Cola Soft Drink 12 fl. oz., 35 pk.", price: 19.48, servingsPerUnit: 35},
            {name: "Sprite Lemon Lime Soda 12 fl. oz., 35 pk.", price: 19.48, servingsPerUnit: 35},
            {name: "A&W Root Beer 12 fl. oz., 24 pk.", price: 10.98, servingsPerUnit: 24}
        ]
    },
    snacks: [
        {name: "Frito-Lay Favorites Mix Chips & Snacks, Variety Pack, 50 pk.", price: 16.48, servingsPerUnit: 50}
    ]
};

// Main calculation function
function calculateCosts() {
    // Get input values
    const attendance = parseInt(document.getElementById('attendance').value);
    const servingsPerPerson = parseFloat(document.getElementById('servings-per-person').value);
    const drinksPerPerson = parseFloat(document.getElementById('drinks-per-person').value);
    
    // Get product selections
    const hotdogType = document.getElementById('hotdog-type').value;
    const hotdogBunType = document.getElementById('hotdog-bun-type').value;
    const burgerType = document.getElementById('burger-type').value;
    const burgerBunType = document.getElementById('burger-bun-type').value;
    const beverageOption = document.getElementById('beverage-option').value;
    
    // Selected products
    const selectedHotdog = productData.hotdogs[hotdogType];
    const selectedHotdogBun = productData.hotdogBuns[hotdogBunType];
    const selectedBurger = productData.burgers[burgerType];
    const selectedBurgerBun = productData.burgerBuns[burgerBunType];
    
    // Create results object
    const results = {
        attendance: attendance,
        totalCost: 0,
        categoryCosts: {
            "HOT DOGS": 0,
            "HAMBURGERS": 0,
            "TOPPINGS": 0,
            "BEVERAGES": 0,
            "SNACKS": 0
        },
        itemizedCosts: []
    };
    
    // Calculate hot dogs needed (approximately half of total servings)
    const hotDogsNeeded = Math.ceil(attendance * servingsPerPerson * 0.5);
    const hotDogPacks = Math.ceil(hotDogsNeeded / selectedHotdog.servingsPerUnit);
    const hotDogCost = hotDogPacks * selectedHotdog.price;
    
    // Add hot dogs to itemized costs
    results.itemizedCosts.push({
        category: "HOT DOGS",
        item: selectedHotdog.name,
        unitPrice: selectedHotdog.price,
        quantity: hotDogPacks,
        totalCost: hotDogCost,
        calculation: `${hotDogPacks} packs * $${selectedHotdog.price.toFixed(2)} = $${hotDogCost.toFixed(2)}`
    });
    
    results.totalCost += hotDogCost;
    results.categoryCosts["HOT DOGS"] += hotDogCost;
    
    // Calculate hot dog buns
    const hotDogBunPacks = Math.ceil(hotDogsNeeded / selectedHotdogBun.servingsPerUnit);
    const hotDogBunCost = hotDogBunPacks * selectedHotdogBun.price;
    
    // Add hot dog buns to itemized costs
    results.itemizedCosts.push({
        category: "HOT DOGS",
        item: selectedHotdogBun.name,
        unitPrice: selectedHotdogBun.price,
        quantity: hotDogBunPacks,
        totalCost: hotDogBunCost,
        calculation: `${hotDogBunPacks} packs * $${selectedHotdogBun.price.toFixed(2)} = $${hotDogBunCost.toFixed(2)}`
    });
    
    results.totalCost += hotDogBunCost;
    results.categoryCosts["HOT DOGS"] += hotDogBunCost;
    
    // Calculate hamburgers needed (approximately half of total servings)
    const burgersNeeded = Math.ceil(attendance * servingsPerPerson * 0.5);
    
    // Handle differently if burger is priced per pound
    let burgerQuantity, burgerCost;
    if (selectedBurger.isPricePerPound) {
        const poundsNeeded = Math.ceil(burgersNeeded / selectedBurger.servingsPerUnit);
        burgerQuantity = `${poundsNeeded} lbs`;
        burgerCost = poundsNeeded * selectedBurger.price;
    } else {
        const packagesNeeded = Math.ceil(burgersNeeded / selectedBurger.servingsPerUnit);
        burgerQuantity = `${packagesNeeded} packs`;
        burgerCost = packagesNeeded * selectedBurger.price;
    }
    
    // Add hamburgers to itemized costs
    results.itemizedCosts.push({
        category: "HAMBURGERS",
        item: selectedBurger.name,
        unitPrice: selectedBurger.isPricePerPound ? `$${selectedBurger.price.toFixed(2)}/lb` : selectedBurger.price,
        quantity: burgerQuantity,
        totalCost: burgerCost,
        calculation: `${burgerQuantity} * $${selectedBurger.price.toFixed(2)} = $${burgerCost.toFixed(2)}`
    });
    
    results.totalCost += burgerCost;
    results.categoryCosts["HAMBURGERS"] += burgerCost;
    
    // Calculate hamburger buns
    const burgerBunPacks = Math.ceil(burgersNeeded / selectedBurgerBun.servingsPerUnit);
    const burgerBunCost = burgerBunPacks * selectedBurgerBun.price;
    
    // Add hamburger buns to itemized costs
    results.itemizedCosts.push({
        category: "HAMBURGERS",
        item: selectedBurgerBun.name,
        unitPrice: selectedBurgerBun.price,
        quantity: burgerBunPacks,
        totalCost: burgerBunCost,
        calculation: `${burgerBunPacks} packs * $${selectedBurgerBun.price.toFixed(2)} = $${burgerBunCost.toFixed(2)}`
    });
    
    results.totalCost += burgerBunCost;
    results.categoryCosts["HAMBURGERS"] += burgerBunCost;
    
    // Calculate toppings
    // Cheese - assume one slice per hot dog and hamburger
    const cheeseItem = productData.toppings[0]; // Kraft Singles
    const cheeseNeeded = hotDogsNeeded + burgersNeeded;
    const cheesePacks = Math.ceil(cheeseNeeded / cheeseItem.servingsPerUnit);
    const cheeseCost = cheesePacks * cheeseItem.price;
    
    // Add cheese to itemized costs
    results.itemizedCosts.push({
        category: "TOPPINGS",
        item: cheeseItem.name,
        unitPrice: cheeseItem.price,
        quantity: cheesePacks,
        totalCost: cheeseCost,
        calculation: `${cheesePacks} packs * $${cheeseItem.price.toFixed(2)} = $${cheeseCost.toFixed(2)}`
    });
    
    results.totalCost += cheeseCost;
    results.categoryCosts["TOPPINGS"] += cheeseCost;
    
    // Ketchup
    const ketchupItem = productData.toppings[1]; // Heinz Ketchup
    const ketchupPacks = Math.ceil(attendance / 25); // 1 pack per 25 people
    const ketchupCost = ketchupPacks * ketchupItem.price;
    
    // Add ketchup to itemized costs
    results.itemizedCosts.push({
        category: "TOPPINGS",
        item: ketchupItem.name,
        unitPrice: ketchupItem.price,
        quantity: ketchupPacks,
        totalCost: ketchupCost,
        calculation: `${ketchupPacks} packs * $${ketchupItem.price.toFixed(2)} = $${ketchupCost.toFixed(2)}`
    });
    
    results.totalCost += ketchupCost;
    results.categoryCosts["TOPPINGS"] += ketchupCost;
    
    // Mustard
    const mustardItem = productData.toppings[2]; // French's Mustard
    const mustardPacks = Math.ceil(attendance / 30); // 1 pack per 30 people
    const mustardCost = mustardPacks * mustardItem.price;
    
    // Add mustard to itemized costs
    results.itemizedCosts.push({
        category: "TOPPINGS",
        item: mustardItem.name,
        unitPrice: mustardItem.price,
        quantity: mustardPacks,
        totalCost: mustardCost,
        calculation: `${mustardPacks} packs * $${mustardItem.price.toFixed(2)} = $${mustardCost.toFixed(2)}`
    });
    
    results.totalCost += mustardCost;
    results.categoryCosts["TOPPINGS"] += mustardCost;
    
    // Add lettuce and tomatoes
    const lettuceItem = productData.toppings[3]; // Iceberg Lettuce
    const lettucePacks = Math.ceil(attendance / lettuceItem.servingsPerUnit);
    const lettuceCost = lettucePacks * lettuceItem.price;
    
    results.itemizedCosts.push({
        category: "TOPPINGS",
        item: lettuceItem.name,
        unitPrice: lettuceItem.price,
        quantity: lettucePacks,
        totalCost: lettuceCost,
        calculation: `${lettucePacks} packs * $${lettuceItem.price.toFixed(2)} = $${lettuceCost.toFixed(2)}`
    });
    
    results.totalCost += lettuceCost;
    results.categoryCosts["TOPPINGS"] += lettuceCost;
    
    const tomatoItem = productData.toppings[4]; // Tomatoes
    const tomatoPacks = Math.ceil(attendance / tomatoItem.servingsPerUnit);
    const tomatoCost = tomatoPacks * tomatoItem.price;
    
    results.itemizedCosts.push({
        category: "TOPPINGS",
        item: tomatoItem.name,
        unitPrice: tomatoItem.price,
        quantity: tomatoPacks,
        totalCost: tomatoCost,
        calculation: `${tomatoPacks} packs * $${tomatoItem.price.toFixed(2)} = $${tomatoCost.toFixed(2)}`
    });
    
    results.totalCost += tomatoCost;
    results.categoryCosts["TOPPINGS"] += tomatoCost;
    
    // Calculate beverages
    const drinksNeeded = attendance * drinksPerPerson;
    const beverageItems = (beverageOption === 'water-only') 
        ? productData.beverages.water 
        : productData.beverages.mixed;
    
    // If water only
    if (beverageOption === 'water-only') {
        const waterItem = beverageItems[0];
        const waterPacks = Math.ceil(drinksNeeded / waterItem.servingsPerUnit);
        const waterCost = waterPacks * waterItem.price;
        
        results.itemizedCosts.push({
            category: "BEVERAGES",
            item: waterItem.name,
            unitPrice: waterItem.price,
            quantity: waterPacks,
            totalCost: waterCost,
            calculation: `${waterPacks} packs * $${waterItem.price.toFixed(2)} = $${waterCost.toFixed(2)}`
        });
        
        results.totalCost += waterCost;
        results.categoryCosts["BEVERAGES"] += waterCost;
    } 
    // If mixed beverages
    else {
        // Distribute drinks evenly among types
        const drinksPerType = drinksNeeded / beverageItems.length;
        
        for (const bevItem of beverageItems) {
            const bevPacks = Math.ceil(drinksPerType / bevItem.servingsPerUnit);
            const bevCost = bevPacks * bevItem.price;
            
            results.itemizedCosts.push({
                category: "BEVERAGES",
                item: bevItem.name,
                unitPrice: bevItem.price,
                quantity: bevPacks,
                totalCost: bevCost,
                calculation: `${bevPacks} packs * $${bevItem.price.toFixed(2)} = $${bevCost.toFixed(2)}`
            });
            
            results.totalCost += bevCost;
            results.categoryCosts["BEVERAGES"] += bevCost;
        }
    }
    
    // Calculate snacks
    const snackItem = productData.snacks[0]; // Frito-Lay Variety Pack
    const snacksNeeded = attendance; // 1 per person
    const snackPacks = Math.ceil(snacksNeeded / snackItem.servingsPerUnit);
    const snackCost = snackPacks * snackItem.price;
    
    results.itemizedCosts.push({
        category: "SNACKS",
        item: snackItem.name,
        unitPrice: snackItem.price,
        quantity: snackPacks,
        totalCost: snackCost,
        calculation: `${snackPacks} packs * $${snackItem.price.toFixed(2)} = $${snackCost.toFixed(2)}`
    });
    
    results.totalCost += snackCost;
    results.categoryCosts["SNACKS"] += snackCost;
    
    // Calculate cost per person
    results.costPerPerson = results.totalCost / attendance;
    
    // Return the results
    return results;
}

// Function to update the UI with calculation results
function updateResults(results) {
    // Update summary
    document.getElementById('total-cost').textContent = `$${results.totalCost.toFixed(2)}`;
    document.getElementById('cost-per-person').textContent = `$${results.costPerPerson.toFixed(2)}`;
    
    // Update itemized table
    const itemizedTableBody = document.getElementById('itemized-table-body');
    itemizedTableBody.innerHTML = '';
    
    let currentCategory = '';
    
    for (const item of results.itemizedCosts) {
        // Add category header if first item in category
        if (currentCategory !== item.category) {
            currentCategory = item.category;
            
            const headerRow = document.createElement('tr');
            headerRow.className = 'category-header';
            
            const headerCell = document.createElement('td');
            headerCell.colSpan = 6;
            headerCell.textContent = currentCategory;
            
            headerRow.appendChild(headerCell);
            itemizedTableBody.appendChild(headerRow);
        }
        
        // Add item row
        const row = document.createElement('tr');
        
        const categoryCell = document.createElement('td');
        categoryCell.textContent = item.category;
        row.appendChild(categoryCell);
        
        const itemNameCell = document.createElement('td');
        itemNameCell.textContent = item.item;
        row.appendChild(itemNameCell);
        
        const priceCell = document.createElement('td');
        priceCell.textContent = typeof item.unitPrice === 'string' ? item.unitPrice : `$${item.unitPrice.toFixed(2)}`;
        row.appendChild(priceCell);
        
        const quantityCell = document.createElement('td');
        quantityCell.textContent = item.quantity;
        row.appendChild(quantityCell);
        
        const totalCell = document.createElement('td');
        totalCell.textContent = `$${item.totalCost.toFixed(2)}`;
        row.appendChild(totalCell);
        
        const calculationCell = document.createElement('td');
        calculationCell.textContent = item.calculation;
        row.appendChild(calculationCell);
        
        itemizedTableBody.appendChild(row);
    }
    
    // Add total row
    const totalRow = document.createElement('tr');
    totalRow.className = 'total-row';
    
    const emptyCell1 = document.createElement('td');
    totalRow.appendChild(emptyCell1);
    
    const emptyCell2 = document.createElement('td');
    totalRow.appendChild(emptyCell2);
    
    const emptyCell3 = document.createElement('td');
    totalRow.appendChild(emptyCell3);
    
    const totalLabelCell = document.createElement('td');
    totalLabelCell.textContent = 'TOTAL';
    totalLabelCell.style.textAlign = 'right';
    totalLabelCell.style.fontWeight = 'bold';
    totalRow.appendChild(totalLabelCell);
    
    const totalValueCell = document.createElement('td');
    totalValueCell.textContent = `$${results.totalCost.toFixed(2)}`;
    totalValueCell.style.fontWeight = 'bold';
    totalRow.appendChild(totalValueCell);
    
    const emptyCell4 = document.createElement('td');
    totalRow.appendChild(emptyCell4);
    
    itemizedTableBody.appendChild(totalRow);
    
    // Update category summary table
    const categorySummaryBody = document.getElementById('category-summary-body');
    categorySummaryBody.innerHTML = '';
    
    for (const category in results.categoryCosts) {
        const row = document.createElement('tr');
        
        const categoryCell = document.createElement('td');
        categoryCell.textContent = category;
        row.appendChild(categoryCell);
        
        const costCell = document.createElement('td');
        costCell.textContent = `$${results.categoryCosts[category].toFixed(2)}`;
        row.appendChild(costCell);
        
        categorySummaryBody.appendChild(row);
    }
    
    // Add total row to category summary
    const categoryTotalRow = document.createElement('tr');
    categoryTotalRow.className = 'total-row';
    
    const categoryTotalLabelCell = document.createElement('td');
    categoryTotalLabelCell.textContent = 'TOTAL';
    categoryTotalLabelCell.style.fontWeight = 'bold';
    categoryTotalRow.appendChild(categoryTotalLabelCell);
    
    const categoryTotalValueCell = document.createElement('td');
    categoryTotalValueCell.textContent = `$${results.totalCost.toFixed(2)}`;
    categoryTotalValueCell.style.fontWeight = 'bold';
    categoryTotalRow.appendChild(categoryTotalValueCell);
    
    categorySummaryBody.appendChild(categoryTotalRow);
    
    // Update comparison table
    updateComparisonTable();
}

// Function to calculate costs for different attendance levels
function calculateForAttendance(attendanceLevel) {
    // Save current values
    const currentAttendance = document.getElementById('attendance').value;
    
    // Temporarily set attendance to the level we want to calculate for
    document.getElementById('attendance').value = attendanceLevel;
    
    // Calculate costs for this attendance level
    const results = calculateCosts();
    
    // Restore original attendance value
    document.getElementById('attendance').value = currentAttendance;
    
    return results;
}

// Function to update the comparison table
function updateComparisonTable() {
    const comparisonTableBody = document.getElementById('comparison-table-body');
    comparisonTableBody.innerHTML = '';
    
    const attendanceLevels = [50, 60, 80, 100];
    
    for (const level of attendanceLevels) {
        const results = calculateForAttendance(level);
        
        const row = document.createElement('tr');
        
        const attendanceCell = document.createElement('td');
        attendanceCell.textContent = `${level} people`;
        row.appendChild(attendanceCell);
        
        const totalCostCell = document.createElement('td');
        totalCostCell.textContent = `$${results.totalCost.toFixed(2)}`;
        row.appendChild(totalCostCell);
        
        const costPerPersonCell = document.createElement('td');
        costPerPersonCell.textContent = `$${results.costPerPerson.toFixed(2)}`;
        row.appendChild(costPerPersonCell);
        
        const hotDogsCell = document.createElement('td');
        hotDogsCell.textContent = `$${results.categoryCosts["HOT DOGS"].toFixed(2)}`;
        row.appendChild(hotDogsCell);
        
        const hamburgersCell = document.createElement('td');
        hamburgersCell.textContent = `$${results.categoryCosts["HAMBURGERS"].toFixed(2)}`;
        row.appendChild(hamburgersCell);
        
        const toppingsCell = document.createElement('td');
        toppingsCell.textContent = `$${results.categoryCosts["TOPPINGS"].toFixed(2)}`;
        row.appendChild(toppingsCell);
        
        const beveragesCell = document.createElement('td');
        beveragesCell.textContent = `$${results.categoryCosts["BEVERAGES"].toFixed(2)}`;
        row.appendChild(beveragesCell);
        
        const snacksCell = document.createElement('td');
        snacksCell.textContent = `$${results.categoryCosts["SNACKS"].toFixed(2)}`;
        row.appendChild(snacksCell);
        
        comparisonTableBody.appendChild(row);
    }
}

// Function to generate Excel data for export
function generateExcelData() {
    // Get current results
    const results = calculateCosts();
    
    // Create summary sheet data
    const summaryData = [
        ['MAY 1ST EVENT COST CALCULATION'],
        [''],
        ['Date', 'May 1, 2025'],
        ['Attendance', document.getElementById('attendance').value],
        ['Servings Per Person', document.getElementById('servings-per-person').value],
        ['Drinks Per Person', document.getElementById('drinks-per-person').value],
        ['Beverage Option', document.getElementById('beverage-option').options[document.getElementById('beverage-option').selectedIndex].text],
        ['Total Cost', `$${results.totalCost.toFixed(2)}`],
        ['Cost Per Person', `$${results.costPerPerson.toFixed(2)}`],
        [''],
        ['CATEGORY COSTS'],
        ['Category', 'Cost']
    ];
    
    // Add category costs to summary
    for (const category in results.categoryCosts) {
        summaryData.push([category, `$${results.categoryCosts[category].toFixed(2)}`]);
    }
    
    // Add total row
    summaryData.push(['TOTAL', `$${results.totalCost.toFixed(2)}`]);
    
    // Create itemized breakdown sheet data
    const itemizedData = [
        ['ITEMIZED COST BREAKDOWN'],
        [''],
        ['Category', 'Item', 'Unit Price', 'Quantity', 'Total Cost', 'Calculation']
    ];
    
    let currentCategory = '';
    
    for (const item of results.itemizedCosts) {
        // Add category header if first item in category
        if (currentCategory !== item.category) {
            currentCategory = item.category;
            itemizedData.push([item.category, '', '', '', '', '']);
        }
        
        // Add item row
        itemizedData.push([
            item.category,
            item.item,
            typeof item.unitPrice === 'string' ? item.unitPrice : `$${item.unitPrice.toFixed(2)}`,
            item.quantity,
            `$${item.totalCost.toFixed(2)}`,
            item.calculation
        ]);
    }
    
    // Add total row
    itemizedData.push(['', '', '', 'TOTAL', `$${results.totalCost.toFixed(2)}`, '']);
    
    // Create comparison sheet data
    const comparisonData = [
        ['ATTENDANCE COMPARISON'],
        [''],
        ['Attendance', 'Total Cost', 'Cost Per Person', 'Hot Dogs', 'Hamburgers', 'Toppings', 'Beverages', 'Snacks']
    ];
    
    const attendanceLevels = [50, 60, 80, 100];
    
    for (const level of attendanceLevels) {
        const levelResults = calculateForAttendance(level);
        
        comparisonData.push([
            `${level} people`,
            `$${levelResults.totalCost.toFixed(2)}`,
            `$${levelResults.costPerPerson.toFixed(2)}`,
            `$${levelResults.categoryCosts["HOT DOGS"].toFixed(2)}`,
            `$${levelResults.categoryCosts["HAMBURGERS"].toFixed(2)}`,
            `$${levelResults.categoryCosts["TOPPINGS"].toFixed(2)}`,
            `$${levelResults.categoryCosts["BEVERAGES"].toFixed(2)}`,
            `$${levelResults.categoryCosts["SNACKS"].toFixed(2)}`
        ]);
    }
    
    // Return all sheet data
    return {
        summary: summaryData,
        itemized: itemizedData,
        comparison: comparisonData
    };
}

// Function to export to Excel
function exportToExcel() {
    const data = generateExcelData();
    
    // Create workbook
    const wb = XLSX.utils.book_new();
    
    // Add summary sheet
    const summaryWs = XLSX.utils.aoa_to_sheet(data.summary);
    XLSX.utils.book_append_sheet(wb, summaryWs, "Summary");
    
    // Add itemized sheet
    const itemizedWs = XLSX.utils.aoa_to_sheet(data.itemized);
    XLSX.utils.book_append_sheet(wb, itemizedWs, "Itemized Breakdown");
    
    // Add comparison sheet
    const comparisonWs = XLSX.utils.aoa_to_sheet(data.comparison);
    XLSX.utils.book_append_sheet(wb, comparisonWs, "Attendance Comparison");
    
    // Generate Excel file and trigger download
    XLSX.writeFile(wb, "May_1st_Event_Cost_Calculator.xlsx");
}

// Function to export to CSV
function exportToCSV() {
    // Get current results
    const results = calculateCosts();
    
    // Create CSV content
    let csvContent = "Category,Item,Unit Price,Quantity,Total Cost,Calculation\n";
    
    for (const item of results.itemizedCosts) {
        // Format each field properly for CSV
        const category = item.category.replace(/,/g, ";");
        const itemName = item.item.replace(/,/g, ";");
        const unitPrice = typeof item.unitPrice === 'string' ? item.unitPrice.replace(/,/g, ";") : `${item.unitPrice.toFixed(2)}`;
        const quantity = String(item.quantity).replace(/,/g, ";");
        const totalCost = `${item.totalCost.toFixed(2)}`;
        const calculation = item.calculation.replace(/,/g, ";");
        
        // Add row to CSV content
        csvContent += `"${category}","${itemName}","${unitPrice}","${quantity}","${totalCost}","${calculation}"\n`;
    }
    
    // Add total row
    csvContent += `"","","","TOTAL","${results.totalCost.toFixed(2)}",""\n`;
    
    // Create a blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "May_1st_Event_Costs.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Function to copy table for Excel
function copyTableForExcel() {
    // Get current results
    const results = calculateCosts();
    
    // Create tab-separated content
    let tsvContent = "Category\tItem\tUnit Price\tQuantity\tTotal Cost\tCalculation\n";
    
    for (const item of results.itemizedCosts) {
        // Format each field properly for TSV
        const category = item.category;
        const itemName = item.item;
        const unitPrice = typeof item.unitPrice === 'string' ? item.unitPrice : `${item.unitPrice.toFixed(2)}`;
        const quantity = String(item.quantity);
        const totalCost = `${item.totalCost.toFixed(2)}`;
        const calculation = item.calculation;
        
        // Add row to TSV content
        tsvContent += `${category}\t${itemName}\t${unitPrice}\t${quantity}\t${totalCost}\t${calculation}\n`;
    }
    
    // Add total row
    tsvContent += `\t\t\tTOTAL\t${results.totalCost.toFixed(2)}\t\n`;
    
    // Copy to clipboard
    const textarea = document.createElement('textarea');
    textarea.value = tsvContent;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    
    alert("Table copied! You can now paste it directly into Excel.");
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Set up tab functionality
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Toggle active class on buttons
            document.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            // Toggle active class on tab content
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
            });
            document.getElementById(tabId + '-tab').classList.add('active');
        });
    });
    
    // Calculate button event listener
    document.getElementById('calculate-btn').addEventListener('click', function() {
        const results = calculateCosts();
        updateResults(results);
    });
    
    // Export buttons event listeners
    document.getElementById('export-excel-btn').addEventListener('click', exportToExcel);
    document.getElementById('export-csv-btn').addEventListener('click', exportToCSV);
    document.getElementById('copy-table-btn').addEventListener('click', copyTableForExcel);
    
    // Initial calculation on page load
    const results = calculateCosts();
    updateResults(results);
});