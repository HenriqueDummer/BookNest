import mongoose from "mongoose";

const characterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  relationships: [
    {
      characterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Character"
      },
      type: {
        type: String
      }
    }
  ],
  notes: [{
    type: String
  }]
});

const Character = mongoose.model("Character", characterSchema);

export default Character;