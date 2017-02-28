function FishWeb(type){
	this.x = 0;
	this.y = 0;
	this.type = type;
	this.scale = 1;
}
FishWeb.prototype.draw = function(gd){
	gd.save();
	gd.translate(this.x,this.y);
	gd.scale(this.scale,this.scale);
	switch(this.type){
		case 1:
			gd.drawImage(JSON['web'],
				22,22,200,200,
				-200/2,-200/2,200,200
			);
			gd.restore();
		break;
		case 2:
			gd.drawImage(JSON['web'],
				22,22,200,200,
				-200/2,-200/2,200,200
			);
			gd.restore();
		break;
		case 3:
			gd.drawImage(JSON['web'],
				22,22,200,200,
				-200/2,-200/2,200,200
			);
			gd.restore();
		break;
		case 4:
			gd.drawImage(JSON['web'],
				22,22,200,200,
				-200/2,-200/2,200,200
			);
			gd.restore();
		break;
		case 5:
			gd.drawImage(JSON['web'],
				22,22,200,200,
				-200/2,-200/2,200,200
			);
			gd.restore();
		break;
	}
};