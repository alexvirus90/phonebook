Ext.require([
	'Ext.grid.*',
	'Ext.data.*',
	'Ext.util.*',
	'Ext.form.*',
	'Ext.container',
//    'Ext.state.*',
	'Ext.grid.filters.Filters'
]);
Ext.application({
	name: 'Phonebook',
	launch: function () {
		Ext.define('User', {
			extend: 'Ext.data.Model',
			fields: [{
				name: 'name',
				type: 'string'
			}, {
				name: 'surname',
				type: 'string'
			}, {
				name: 'phone',
				type: 'string'
			}, {
				name: 'place_of_work',
				type: 'string'
			}],
			proxy: {
				type: 'localstorage',
				id: 'settings'
			}
		});
		var store = Ext.create('Ext.data.Store', {
			model: "User"
		});
		store.load();
		//now add some Searches
		store.add({
			name: 'Sencha Touch',
			surname: 'sdfdsfs',
			phone: 'ssdfsdfds',
			place_of_work: "dfgfdgdf"
		});
		store.save();
		// их загрузка из Local Storage
		/*User.load(1, {
		 callback: function (model, operation) {
		 alert('Ник:' + model.get('name'));
		 alert('Электронная почта:' + model.get('email'));
		 }
		 });*/
		this.grid = this.buildGrid(store);
	},
	buildGrid: function (store) {
		// this.tbar = this.buildTbar();
		Ext.create('Ext.container.Viewport', {
			layout: 'border',
			items: [{
				region: 'north',
				title: 'Контакты',
				border: false,
				items: [{
					xtype: 'toolbar',
					items: [{
						xtype: 'button',
						text: 'Добавить контакт',
						scope: this,
						handler: this.btnAddContact
					}]
				}]
			}, {
				region: 'center',
				collapsible: false,
				items: [{
					// I want to add it just there
					xtype: 'grid',
					store: store,
					columns: [{
						text: 'Имя',
						dataIndex: 'name',
						flex: 1
					}, {
						text: 'Фамилия',
						dataIndex: 'surname',
						flex: 1
					}, {
						text: 'Телефон',
						dataIndex: 'phone',
						flex: 1
					}, {
						text: 'Место работы',
						dataIndex: 'place_of_work',
						flex: 1
					}],
					listeners: {
						rowdblclick: function (grid, record, tr, rowIndex, e, eOpts) {
							alert(record.get("name"));
						}
					}
				}]
			}]
		});
	},
	btnAddContact: function () {
		this.form = this.buildForm();
		//TODO: переделать кнопку
		this.btnCancel = Ext.create('Ext.button.Button', {
			text: 'Отмена'
		}, function (){
			this.win.close()
		},this);
		this.nav = Ext.create('Ext.panel.Panel',{
			region: 'west',
			split: true,
			width: 350,
			border: false,
			margins: '3 0 3 3',
			cmargins: '3 3 3 3',
			layout: 'fit',
			scope: this,
			items: this.form
		});
		this.win = Ext.create('Ext.window.Window', {
			height: 200,
			width: 350,
			iconCls: 'menu_repo_grid',
			resizable: true,
			plain: true,
			scope: this,
			layout: 'border',
			// layout: 'fit',
			title: "Добавить контакт",
			modal: true,
			closable: false,
			border: false,
			items: [this.nav]
		});
		this.win.show();
	},
	buildForm: function () {
		this.nameC = Ext.form.field.Text({
			allowBlank: false,
			blankText: "Данное поле не должен быть пустым!",
			fieldLabel: "Имя",
			name: "name"
		});
		this.surnameC = Ext.form.field.Text({
			allowBlank: false,
			blankText: "Данное поле не должен быть пустым!",
			fieldLabel: "Фамилия",
			name: "surname"
		});
		this.phoneC = Ext.form.field.Text({
			allowBlank: false,
			blankText: "Данное поле не должен быть пустым!",
			fieldLabel: "Телефон",
			name: "phone"
		});
		this.placeOfWork = Ext.form.field.Text({
			allowBlank: false,
			blankText: "Данное поле не должен быть пустым!",
			fieldLabel: "Место работы",
			name: "place_of_work"
		});
		this.formVeh = new Ext.form.Panel({
			border: true,
			labelWidth: 115,
			monitorValid: true,
			items: [this.nameC, this.surnameC, this.phoneC, this.placeOfWork]
		});
		return this.formVeh;
	}
});