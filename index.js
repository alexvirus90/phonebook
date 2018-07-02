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
		Ext.define('Contacts', {
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
		this.storePB = Ext.create('Ext.data.Store', {
			model: "Contacts"
		});
		this.storePB.load();
		this.grid = this.buildGrid(this.storePB);
	},
	buildGrid: function (store) {
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
					scope: this,
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
					}, {
						xtype: 'actioncolumn',
						width: 50,
						scope: this,
						fixed: true,
						items: [{
							iconCls: 'btnEdit',
							handler: this.editContact,
							tooltip: 'Редактировать'
						}, {
							iconCls: 'btnDel',
							handler: this.btnDelContact,
							tooltip: 'Удалить'
						}]
					}]
				}]
			}]
		});
	},
	buildPanel: function (form) {
		return Ext.create('Ext.panel.Panel', {
			region: 'center',
			split: true,
			border: false,
			margins: '3 0 3 3',
			cmargins: '3 3 3 3',
			layout: 'fit',
			bodyStyle: {"background": "red"},
			items: [form]
		});
	},
	buildWindow: function (panel, title) {
		return Ext.create('Ext.window.Window', {
			height: 230,
			width: 450,
			iconCls: 'menu_repo_grid',
			resizable: true,
			plain: true,
			layout: 'border',
			title: title,
			modal: true,
			closable: false,
			border: false,
			items: [panel]
		});
	},
	btnAddContact: function () {
		this.storePB.load();
		this.form = this.buildForm();
		this.nav = this.buildPanel(this.form);
		this.win = this.buildWindow(this.nav, "Добавить контакт");
		this.win.show();
	},
	editContact: function (gr, rInd, e) {
		console.log('gr1', gr);
		// gr.getSelectionModel().getAt(rInd);
		// var record = this.getStore().getSelection();
		// this.btnEditContact(record, 'Редактировать контакт');
	},
	btnEditContact: function (rec, title) {
		console.log('111', rec, title);
	},
	btnDelContact: function () {

	},
	buildForm: function () {
		this.formC = Ext.create('Ext.form.Panel', {
			bodyPadding: 10,
			items: [{
				xtype: 'textfield',
				allowBlank: false,
				blankText: "Данное поле не должен быть пустым!",
				fieldLabel: "Имя",
				name: "name"
			}, {
				xtype: 'textfield',
				allowBlank: false,
				blankText: "Данное поле не должен быть пустым!",
				fieldLabel: "Фамилия",
				name: "surname"
			}, {
				xtype: 'textfield',
				allowBlank: false,
				blankText: "Данное поле не должен быть пустым!",
				fieldLabel: "Телефон",
				name: "phone"
			}, {
				xtype: 'textfield',
				allowBlank: false,
				blankText: "Данное поле не должен быть пустым!",
				fieldLabel: "Место работы",
				name: "place_of_work"
			}],
			buttons: [{
				xtype: 'button',
				scope: this,
				text: "Сохранить",
				handler: function () {
					var values = this.formC.getForm().getFieldValues();
					this.storePB.add({
						name: values.name,
						surname: values.surname,
						phone: values.phone,
						place_of_work: values.place_of_work
					});
					this.storePB.save();
					this.win.close()
				}
			}, {
				xtype: 'button',
				scope: this,
				text: "Отмена",
				handler: function () {
					this.win.close()
				}
			}]
		});
		return this.formC;
	}
});