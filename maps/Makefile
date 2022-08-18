all: map_sample.ts

%.ts: %.json
	node tmj2map.cjs $< > $@
