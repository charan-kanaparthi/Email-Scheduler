const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        to: { type: DataTypes.STRING, allowNull: false },
        from: { type: DataTypes.STRING, allowNull: false },
        subject: { type: DataTypes.STRING, allowNull: false },
        body: { type: DataTypes.STRING, allowNull: false },
        scheduled_at:{type:DataTypes.DATE ,allowNull: false   },
        status:{type:DataTypes.STRING ,allowNull: false   },
    };

  

    return sequelize.define('Email', attributes);
}