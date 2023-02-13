
RED=\033[0;31m
GREEN=\033[32m
BLEU=\033[34m
NC=\033[0m

help:
	@echo -e "##########################################################################################################################"
	@echo -e "# $(GREEN)make deploy $(NC): deploy and up containers in background mode, if you dont specify ENV default value is 'dev'.#"
	@echo -e "###########################################################################################################################"


deploy: create-network docker-up

docker-up:
	docker-compose -f ./docker-compose.yaml  up -d

create-network:
	docker network create scoreApi --subnet=10.5.0.0/16 --gateway=10.5.0.1

destroy: down-docker destroy-network

down-docker:
	docker-compose -f ./docker-compose.yaml down

destroy-network:
	docker network rm scoreApi -f

monitor-log:
	docker-compose -f ./docker-compose.yaml logs -f
