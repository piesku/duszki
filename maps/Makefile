JSON := $(wildcard *.json)
MAPS := $(JSON:%.json=%.ts)

all: $(MAPS)

%.ts: %.json
	node tmj2map.cjs $< > $@
