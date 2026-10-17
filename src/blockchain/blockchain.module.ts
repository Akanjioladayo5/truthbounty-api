import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockchainIndexerService } from './blockchain-indexer.service';
import { ProcessedEvent, TokenBalance, IndexerCheckpoint } from './entities';
import { BlockchainStateService } from './state.service';
import { ReorgDetectorService } from './reorg-detector.service';
import { ReconciliationService } from './reconciliation.service';
import { EventIndexingService } from './event-indexing.service';
import { BlockchainController } from './blockchain.controller';
import { WeightedVoteResolutionService } from './weighted-vote-resolution.service';
import { SybilResistanceModule } from '../sybil-resistance/sybil-resistance.module';
import { StartupValidationService } from './startup-validation.service';
import { DeterministicRpcFailoverService } from './deterministic-rpc-failover.service';
import { ReadinessService } from './readiness.service';
import { DependencyProvenanceService } from './dependency-provenance.service';
import { WebhookSignatureVerifierService } from './webhook-signature-verifier.service';
import { WebhookDelivery, WebhookSecretRotation } from './webhook-entities';
import { WebhookReceiverController } from './webhook-receiver.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProcessedEvent,
      TokenBalance,
      IndexerCheckpoint,
      WebhookDelivery,
      WebhookSecretRotation,
    ]),
    SybilResistanceModule,
  ],
  providers: [
    BlockchainIndexerService,
    BlockchainStateService,
    ReadinessService,
    DependencyProvenanceService,
    ReorgDetectorService,
    ReconciliationService,
    EventIndexingService,
    StartupValidationService,
    DeterministicRpcFailoverService,
    WebhookSignatureVerifierService,
  ],
  controllers: [BlockchainController, WebhookReceiverController],
  exports: [
    BlockchainIndexerService,
    BlockchainStateService,
    ReadinessService,
    DependencyProvenanceService,
    ReorgDetectorService,
    ReconciliationService,
    EventIndexingService,
    DeterministicRpcFailoverService,
    WebhookSignatureVerifierService,
  ],
})
export class BlockchainModule {}
