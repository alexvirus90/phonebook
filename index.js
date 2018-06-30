Ext.require([
	'Ext.grid.*',
	'Ext.data.*',
	'Ext.util.*',
	'Ext.form.*',
//    'Ext.state.*',
	'Ext.grid.filters.Filters'
]);
Ext.onReady(function () {
	Ext.define('Phonebook', {
		extend: 'Ext.data.Model',
		proxy: {
			type: 'localstorage'
		}
	});
	this.btnAdd = Ext.create('Ext.button.Button', {
		text: 'Добавить контакт'
	});
	this.toolbar = Ext.create('Ext.toolbar.Toolbar', {
		renderTo: Ext.getBody(),
		width: 200,
		margin: '5 0 0 0',
		items: [this.btnAdd]
	});
	this.btnAdd.on('click', function () {
		this.win.show();
	}, this);
	this.form = Ext.create('Ext.form.Panel', {
		region: 'center',
		items: [{
			xtype: 'textfield',
			name: 'name',
			fieldLabel: 'Имя',
			border: true
		}, {
			xtype: 'textfield',
			name: 'surname',
			fieldLabel: 'Фамилия'
		}, {
			xtype: 'textfield',
			name: 'place_of_work',
			fieldLabel: "Место работы"
		}, {
		}, {
			xtype: 'textfield',
			name: 'phone',
			fieldLabel: "Телефон"
		}]
	});
	this.win = Ext.create('Ext.window.Window', {
		title: 'Добавить контакт',
		height: 200,
		width: 400,
		layout: 'fit',
		items: this.form

	});
	// create the Data Store
	this.store = Ext.create('Ext.data.Store', {
		id: 'store',
		model: 'Phonebook',
		remoteGroup: true,
		leadingBufferZone: 300,
		pageSize: 100,
		autoLoad: true,
		fields: [
			{name: 'name', type: 'string'},
			{name: 'surname', type: 'string'},
			{name: 'place_of_work', type: 'string'},
			{name: 'phone', type: 'int'}
		]/*,
		 validators: {
		 name: {type: 'length', min: 2, /!*matcher: /([a-z]+)[0-9]{2,3}/i *!/},
		 surname: {type: 'length', min: 2, /!*matcher: /([a-z]+)[0-9]{2,3}/i *!/},
		 place_of_work: {type: 'length', min: 2, /!*matcher: /([a-z]+)[0-9]{2,3}/i *!/},
		 phone: {type: 'length', min: 2, /!* matcher: /^[+][7]*[(]{0,1}[0-9]{1,4}[)][ ]{0,1}[-\s\./0-9]*$/i *!/}
		 }*/
	});
	this.grid = Ext.create('Ext.grid.Panel', {
		scroll: false,
		autoLoad: true,
		title: 'Контакты',
		store: this.store,
		loadMask: true,
		defaults: {sortable: false, menuDisabled: true},
		columns: [{
			xtype: 'rownumberer',
			width: 50
		}, {
			text: "Имя",
			dataIndex: 'name',
			flex: 1,
			align: 'center'
		}, {
			text: "Фамилия",
			flex: 1,
			menuDisabled: true,
			sortable: false,
			dataIndex: 'surname',
			align: 'center'
		}, {
			text: "Место работы",
			flex: 1,
			menuDisabled: true,
			sortable: false,
			dataIndex: 'place_of_work',
			align: 'center'
		}, {
			text: "Телефон",
			flex: 1,
			menuDisabled: true,
			sortable: false,
			dataIndex: 'phone',
			align: 'center'
		}, {
			xtype: 'actioncolumn',
			width: 50,
			items: [{
				icon: './images/edit.png',
				handler: this.btnEdit
			}, {
				icon: './images/del.png',
				handler: this.btnDel
			}]
		}],
		renderTo: Ext.getBody()
	});
});