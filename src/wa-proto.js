const protobuf = require('protobufjs');

// Schema minimă pentru mesaje WhatsApp (adaptată din Baileys)
const proto = `
syntax = "proto3";

message Message {
  string conversation = 1;
  ImageMessage imageMessage = 2;
  VideoMessage videoMessage = 3;
  DocumentMessage documentMessage = 4;
  ReactionMessage reactionMessage = 5;
}

message ImageMessage {
  string url = 1;
  string mimetype = 2;
  string caption = 3;
}

message VideoMessage {
  string url = 1;
  string mimetype = 2;
  string caption = 3;
}

message DocumentMessage {
  string url = 1;
  string mimetype = 2;
  string fileName = 3;
}

message ReactionMessage {
  string text = 1;
  string key = 2;
}
`;

const root = protobuf.parse(proto).root;

module.exports = root;