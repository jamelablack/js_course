var p  = " In the midway of this our mortal life,\
	I found me in a gloomy wood, astray\
	Gone from the path direct: and e'en to tell\
	It were no easy task, how savage wild\
	That forest, how robust and rough its growth,\
	Which to remember only, my dismay\
	Renews, in bitterness not far from death.\
	Yet to discourse of what there good befell,\
	All else will I relate discover'd there.\
	How first I enter'd it I scarce can say,\
	Such sleepy dullness in that instant weigh'd\
	My senses down, when the true path I left,\
	But when a mountain's foot I reach'd, where clos'd\
	The valley, that had pierc'd my heart with dread,\
	I look'd aloft, and saw his shoulders broad\
	Already vested with that planet's beam,\
	Who leads all wanderers safe through every way.";

var word_counts = {},
    words, most_frequent;

words = p.replace(/,/g,"");
words = words.replace(/\./g, "");
words = words.replace(/:/g, "");
words = words.replace(/s+/g, " ");
words = words.split(" ");

words.forEach(function(word) {
  if (!(word in word_counts)) { word_counts[word] = 0; }
  word_counts[word]++;
});

for (var word in word_counts) {
  if (!most_frequent) {
  most_frequent = word;
  }

  if (word_counts[word] > word_counts[most_frequent]) {
    most_frequent = word;
  }
}

console.log("Total words: " + words.length);
console.log("The most frequent word is " + most_frequent + " with " + word_counts[most_frequent] + " occurences.");







