EXAMPLE ?= src
SOURCES := $(shell find .. -type f -name "*.ts")

all: index.html
	@printf "Size gzipped: %s bytes\n" $(shell gzip index.html --stdout | wc -c)

game.esbuild.js: $(SOURCES)
# Remove --noEmit to emit *.js files next to the source *.ts files. index.ts
# will then import the emitted *.js files. This may produce a smaller build
# because the bundle will be ordered differently.
	npx tsc --noEmit
	npx esbuild ../$(EXAMPLE)/index.ts \
		--preserve-symlinks \
		--define:DEBUG=false \
		--target=es2020 \
		--bundle \
		--analyze \
	> $@

index.html: game.html game.esbuild.js game.css debug.css posthtml.cjs
	node posthtml.cjs $< > $@

.PHONY: clean
clean:
	rm -f *.js index.html
