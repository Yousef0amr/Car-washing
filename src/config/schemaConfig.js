const setting = {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            // Transform _id to id in the document's JSON representation
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        },
    },
}


module.exports = setting