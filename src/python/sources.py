import pandas as pd
# import spacy
import nltk

from collections import OrderedDict
from nltk.stem.wordnet import WordNetLemmatizer
from spacy.lang.fr import French
from math import ceil

# GLOBAL VAR
parser = None
fr_stop = None

# LOCAL FUNCTIONS
def tokenize(text):
	global parser

	lda_tokens = []
	tokens = parser(text)

	for token in tokens:
		if token.orth_.isspace():
			continue
		elif token.like_url:
			lda_tokens.append('URL')
		elif token.orth_.startswith('@'):
			lda_tokens.append('SCREEN_NAME')
		else:
			lda_tokens.append(token.lower_)

	return lda_tokens

def get_lemma(word):
	lemma = nltk.corpus.wordnet.morphy(word)
	if lemma is None:
		return word
	else:
		return lemma

def prepare_text_for_lda(text):
	global fr_stop

	tokens = tokenize(text)
	tokens = [token for token in tokens if len(token) > 4]
	tokens = [token for token in tokens if token not in fr_stop]
	tokens = [get_lemma(token) for token in tokens]
	
	return tokens

def matching(dic1, dic2):
	match=0
	for key1, value1 in dic1.items():
		for key2, value2 in dic2.items():
			if key1==key2 :
				match=match+value1*value2
	return match

# EXPORTED FUNCTIONS
def initGlobal():
	global parser 
	global fr_stop

	print("INITIALIZATION")
	print("Check downloads for nltk libs...")
	nltk.download('wordnet')
	nltk.download('stopwords')

	print("Parse into French")
	parser = French()
	fr_stop = set(nltk.corpus.stopwords.words('french'))

	print("DONE")


def processing(data):
	# Variables
	keyWordsJobs = pd.read_json('./wordListsByJobs.json')
	dic = {}
	jobAndMatch = {}
	orderedDictWords = {}
	result = {}

	# Tokenize data
	words = prepare_text_for_lda(data)

	# Count occurences
	for raw_word in words:
		word = raw_word.lower()
		if word in dic:
			dic[word] += 1
		else:
			dic[word] = 1

	orderedDic = OrderedDict(reversed(sorted(dic.items(), key=lambda t: t[1])))

	# Match values
	for job in range(len(keyWordsJobs)):
		val = matching(orderedDic,keyWordsJobs.data.get(job))
		jobAndMatch[job] = val	

	# Format results
	for job in list(OrderedDict(reversed(sorted(jobAndMatch.items(), key=lambda t: t[1]))).items())[0:4]:
		result[job[0]] = ceil(job[1] * 100 / len(words))

	return result

