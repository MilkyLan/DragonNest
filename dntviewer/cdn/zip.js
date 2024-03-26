/**
 * Minified by jsDelivr using UglifyJS v3.0.24.
 * Original file: /npm/zip@1.2.0/zip.js
 * 
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
function FdSource(e){this._fileLength=fs.fstatSync(e).size,this.length=function(){return this._fileLength},this.read=function(r,t){for(var n=bops.create(t);t>0;){var a=0,i=t>8192?8192:t;fs.readSync(e,n,a,i,r),t-=i,r+=i,a+=i}return n}}function BufferSource(e){this._buffer=e,this.length=function(){return e.length},this.read=function(e,r){return bops.subarray(this._buffer,e,e+r)}}var INFLATE=require("./inflate"),bops=require("bops"),fs=require("fs"),LOCAL_FILE_HEADER=67324752,CENTRAL_DIRECTORY_FILE_HEADER=33639248,END_OF_CENTRAL_DIRECTORY_RECORD=101010256,MADE_BY_UNIX=3,Reader=exports.Reader=function(e){if(!(this instanceof Reader))return new Reader(e);bops.is(e)?this._source=new BufferSource(e):this._source=new FdSource(e),this._offset=0};Reader.prototype.length=function(){return this._source.length()},Reader.prototype.position=function(){return this._offset},Reader.prototype.seek=function(e){this._offset=e},Reader.prototype.read=function(e){var r=this._source.read(this._offset,e);return this._offset+=e,r},Reader.prototype.readInteger=function(e,r){return r?bytesToNumberBE(this.read(e)):bytesToNumberLE(this.read(e))},Reader.prototype.readString=function(e,r){return bops.to(this.read(e),r||"utf8")},Reader.prototype.readUncompressed=function(e,r){var t=this.read(e),n=null;if(0===r)n=t;else{if(8!==r)throw new Error("Unknown compression method: "+structure.compression_method);n=INFLATE.inflate(t)}return n},Reader.prototype.readStructure=function(){var e=this,r={};switch(r.signature=e.readInteger(4),r.signature){case LOCAL_FILE_HEADER:this.readLocalFileHeader(r);break;case CENTRAL_DIRECTORY_FILE_HEADER:this.readCentralDirectoryFileHeader(r);break;case END_OF_CENTRAL_DIRECTORY_RECORD:this.readEndOfCentralDirectoryRecord(r);break;default:throw new Error("Unknown ZIP structure signature: 0x"+r.signature.toString(16))}return r},Reader.prototype.readLocalFileHeader=function(e){var r=this;if((e=e||{}).signature||(e.signature=r.readInteger(4)),e.signature!==LOCAL_FILE_HEADER)throw new Error("ZIP local file header signature invalid (expects 0x04034b50, actually 0x"+e.signature.toString(16)+")");e.version_needed=r.readInteger(2),e.flags=r.readInteger(2),e.compression_method=r.readInteger(2),e.last_mod_file_time=r.readInteger(2),e.last_mod_file_date=r.readInteger(2),e.crc_32=r.readInteger(4),e.compressed_size=r.readInteger(4),e.uncompressed_size=r.readInteger(4),e.file_name_length=r.readInteger(2),e.extra_field_length=r.readInteger(2);var t=e.file_name_length,n=e.extra_field_length;return e.file_name=r.readString(t),e.extra_field=r.read(n),e},Reader.prototype.readCentralDirectoryFileHeader=function(e){var r=this;if((e=e||{}).signature||(e.signature=r.readInteger(4)),e.signature!==CENTRAL_DIRECTORY_FILE_HEADER)throw new Error("ZIP central directory file header signature invalid (expects 0x02014b50, actually 0x"+e.signature.toString(16)+")");e.version=r.readInteger(2),e.version_needed=r.readInteger(2),e.flags=r.readInteger(2),e.compression_method=r.readInteger(2),e.last_mod_file_time=r.readInteger(2),e.last_mod_file_date=r.readInteger(2),e.crc_32=r.readInteger(4),e.compressed_size=r.readInteger(4),e.uncompressed_size=r.readInteger(4),e.file_name_length=r.readInteger(2),e.extra_field_length=r.readInteger(2),e.file_comment_length=r.readInteger(2),e.disk_number=r.readInteger(2),e.internal_file_attributes=r.readInteger(2),e.external_file_attributes=r.readInteger(4),e.local_file_header_offset=r.readInteger(4);var t=e.file_name_length,n=e.extra_field_length,a=e.file_comment_length;return e.file_name=r.readString(t),e.extra_field=r.read(n),e.file_comment=r.readString(a),e.mode=r.detectChmod(e.version,e.external_file_attributes),e},Reader.prototype.detectChmod=function(e,r){var t=r>>>16,n=!1;return t&=511,e>>8!==MADE_BY_UNIX||"darwin"!==process.platform&&"linux"!==process.platform||(n=t.toString(8)),n},Reader.prototype.locateEndOfCentralDirectoryRecord=function(){for(var e=this.length(),r=e-Math.pow(2,16)-22,t=e-22+1;--t;){if(t<r)throw new Error("Unable to find end of central directory record");if(this.seek(t),this.readInteger(4)===END_OF_CENTRAL_DIRECTORY_RECORD&&(this.seek(t+20),t+22+this.readInteger(2)===e))break}return this.seek(t),t},Reader.prototype.readEndOfCentralDirectoryRecord=function(e){var r=this;if((e=e||{}).signature||(e.signature=r.readInteger(4)),e.signature!==END_OF_CENTRAL_DIRECTORY_RECORD)throw new Error("ZIP end of central directory record signature invalid (expects 0x06054b50, actually 0x"+e.signature.toString(16)+")");e.disk_number=r.readInteger(2),e.central_dir_disk_number=r.readInteger(2),e.central_dir_disk_records=r.readInteger(2),e.central_dir_total_records=r.readInteger(2),e.central_dir_size=r.readInteger(4),e.central_dir_offset=r.readInteger(4),e.file_comment_length=r.readInteger(2);var t=e.file_comment_length;return e.file_comment=r.readString(t),e},Reader.prototype.readDataDescriptor=function(){var e=this,r={};return r.crc_32=e.readInteger(4),134695760===r.crc_32&&(r.crc_32=e.readInteger(4)),r.compressed_size=e.readInteger(4),r.uncompressed_size=e.readInteger(4),r},Reader.prototype.iterator=function(){var e=this;e.locateEndOfCentralDirectoryRecord();var r=e.readEndOfCentralDirectoryRecord();e.seek(r.central_dir_offset);var t=r.central_dir_disk_records;return{next:function(){if(0==t--)throw"stop-iteration";var r=e.readCentralDirectoryFileHeader(),n=e.position();e.seek(r.local_file_header_offset);var a=e.readLocalFileHeader(),i=e.position();return e.seek(n),new Entry(a,e,i,r.compressed_size,r.compression_method,r.mode)}}},Reader.prototype.forEach=function(e,r){for(var t,n=this.iterator();;){try{t=n.next()}catch(e){if("stop-iteration"===e)break;if("skip-iteration"===e)continue;throw e}e.call(r,t)}},Reader.prototype.toObject=function(e){var r={};return this.forEach(function(t){if(t.isFile()){var n=t.getData();e&&(n=n.toString(e)),r[t.getName()]=n}}),r},Reader.prototype.close=function(e,r){};var Entry=exports.Entry=function(e,r,t,n,a,i){this._mode=i,this._header=e,this._realStream=r,this._stream=null,this._start=t,this._compressedSize=n,this._compressionMethod=a};Entry.prototype.getName=function(){return this._header.file_name},Entry.prototype.isFile=function(){return!this.isDirectory()},Entry.prototype.isDirectory=function(){return"/"===this.getName().slice(-1)},Entry.prototype.lastModified=function(){return decodeDateTime(this._header.last_mod_file_date,this._header.last_mod_file_time)},Entry.prototype.getData=function(){if(null==this._stream){var e=this._realStream.position();this._realStream.seek(this._start),this._stream=this._realStream.readUncompressed(this._compressedSize,this._compressionMethod),this._realStream.seek(e)}return this._stream},Entry.prototype.getMode=function(){return this._mode};var bytesToNumberLE=function(e){for(var r=0,t=0;t<e.length;t++)r+=bops.readUInt8(e,t)<<8*t;return r},bytesToNumberBE=function(e){for(var r=0,t=0;t<e.length;t++)r=(r<<8)+bops.readUInt8(e,t);return r},numberToBytesLE=function(e,r){for(var t=[],n=0;n<r;n++)t[n]=e>>8*n&255;return new bops.from(t)},numberToBytesBE=function(e,r){for(var t=[],n=0;n<r;n++)t[r-n-1]=e>>8*n&255;return new bops.from(t)},decodeDateTime=function(e,r){return new Date(1980+(e>>>9),(e>>>5&15)-1,31&e,r>>>11&31,r>>>5&63,2*(63&r))};
//# sourceMappingURL=/sm/7cd3b82e58e0f504c349901a2b30e6da389df6b4d58981aaf3b4ce0a4da8f457.map