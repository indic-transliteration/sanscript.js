import codecs
import difflib
import glob
import json
import logging
import os.path
import shutil
from collections import OrderedDict
from pprint import pprint

import aksharamukha.transliterate
import regex
import sys
from aksharamukha import GeneralMap


logging.basicConfig(
    level=logging.DEBUG,
    format="%(levelname)s: %(asctime)s %(message)s"
)

REPO_BASE = os.path.dirname(os.path.dirname(__file__))
differ = difflib.Differ()


def update_maps():
    files = glob.glob(os.path.join(REPO_BASE, "src/schemes/brahmic/*.json"))
    devanagari_json_path = os.path.join(REPO_BASE, "src/schemes/brahmic/devanagari.json")
    with codecs.open(devanagari_json_path, "r", "utf-8") as f:
        devanagari_json = f.read()
        dev_charmap = json.loads(devanagari_json)
    for file in files:
        if "devanagari" in file or "_" in file:
            continue
        dest_script = os.path.basename(file).capitalize().replace(".json", "")
        if dest_script.lower() not in ["assamese"]:
            continue
        with codecs.open(file, "r", "utf-8") as f:
            prior_json = f.read()
            charmap_prior = json.loads(prior_json)
        posterior_json = aksharamukha.transliterate.process(src=GeneralMap.DEVANAGARI, tgt=dest_script, txt=devanagari_json)

        if posterior_json != prior_json:
            logging.info("Difference in %s:", file)
            charmap = OrderedDict()
            for key in dev_charmap.keys():
                charmap[key] = []
                for index, x in enumerate(dev_charmap[key]):
                    if key in charmap_prior and len(charmap_prior[key]) > index and charmap_prior[key][index] == "":
                        charmap[key].append(x)
                    else:
                        charmap[key].append(aksharamukha.transliterate.process(src=GeneralMap.DEVANAGARI, tgt=dest_script, txt=x))
            with codecs.open(file, "w", "utf-8") as f:
                json_str = json.dumps(charmap, indent=4, ensure_ascii=False)
                json_str = regex.sub(r"\",\n +", '", ', json_str)
                f.write(json_str)


if __name__ == '__main__':
    update_maps()
