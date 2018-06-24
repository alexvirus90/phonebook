Ext.require([
	'Ext.grid.*',
	'Ext.data.*',
	'Ext.util.*',
//    'Ext.state.*',
	'Ext.grid.filters.Filters'
]);
Ext.onReady(function () {

//Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
	Ext.define('Phonebook', {
		extend: 'Ext.data.Model',
		proxy: {
			type: 'localstorage'
		}
	});
	// create the Data Store
	var store = Ext.create('Ext.data.Store', {
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
			{name: 'phone', type: 'string'}
		],
		validators: {
			name: {type: 'length', min: 2, /*matcher: /([a-z]+)[0-9]{2,3}/i */},
			surname: {type: 'length', min: 2, /*matcher: /([a-z]+)[0-9]{2,3}/i */},
			place_of_work: {type: 'length', min: 2, /*matcher: /([a-z]+)[0-9]{2,3}/i */},
			phone: {type: 'length', min: 2, /* matcher: /^[+][7]*[(]{0,1}[0-9]{1,4}[)][ ]{0,1}[-\s\./0-9]*$/i */}
		}
	});
	var grid = Ext.create('Ext.grid.Panel', {
		scroll: false,
		title: 'Контакты',
		store: store,
		loadMask: true,
		default: {sortable: false, flex: 1},
		columns: [{
			xtype: 'rownumberer',
			width: 50
		}, {
			text: "Имя",
			dataIndex: 'name',
			align: 'center'
		}, {
			text: "Фамилия",
			dataIndex: 'surname',
			align: 'center'
		}, {
			text: "Место работы",
			dataIndex: 'place_of_work',
			align: 'center'
		}, {
			text: "Телефон",
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

	function btnEdit() {
		console.log('edit');
	}

	function btnDel() {
		console.log('del');
	}
});